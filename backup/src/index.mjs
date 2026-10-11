/**
 * Owner-only backup Workflow. NO public endpoints.
 * Each completed backup contains:
 * - a pinned GitHub source ZIP (not full Git history/Issues)
 * - a complete D1 SQL export
 * - a checksummed manifest committed last
 * Scheduled execution is disabled until permissions and restore tests pass.
 */
import {WorkflowEntrypoint} from "cloudflare:workers";
import {NonRetryableError} from "cloudflare:workflows";
import {objectPrefix,requireExportToken,storeVerified,validateGitHubRepo} from "./helpers.mjs";

const BASE_HEADERS={"Accept":"application/vnd.github+json","User-Agent":"baylor-emba-owner-backup/0.2","X-GitHub-Api-Version":"2022-11-28"};
function githubHeaders(env) {
 // The public unauthenticated GitHub API is IP-limited; require a dedicated
 // fine-grained read-only token, scoped to this repository and stored as a secret.
 const token=env.GITHUB_BACKUP_TOKEN;
 if(typeof token!=="string"||token.length<20) throw new NonRetryableError("GITHUB_BACKUP_TOKEN is not configured. GitHub backup is paused until a repository-scoped read-only token is installed.");
 return {...BASE_HEADERS,Authorization:"Bearer "+token};
}
function responseInfo(res) {
 const remaining=res.headers.get("x-ratelimit-remaining");
 const reset=res.headers.get("x-ratelimit-reset");
 const retryAfter=res.headers.get("retry-after");
 return [
  "HTTP "+res.status,
  remaining!==null?"GitHub-remaining="+remaining:null,
  reset!==null?"rate-limit-reset-UTC="+new Date(Number(reset)*1000).toISOString():null,
  retryAfter!==null?"retry-after-seconds="+retryAfter:null
 ].filter(Boolean).join("; ");
}
async function checkedJson(res,action) {
 if(!res.ok) {
  const description=action+": "+responseInfo(res);
  if([401,403,404,429].includes(res.status)) throw new NonRetryableError(description);
  throw new Error(description);
 }
 const data=await res.json();
 if(data?.success===false) throw new Error(action+": API returned success=false");
 return data;
}
async function githubHead(repo,env) {
 validateGitHubRepo(repo);
 const data=await checkedJson(await fetch("https://api.github.com/repos/"+repo+"/commits/main",{headers:githubHeaders(env)}),"GitHub HEAD");
 if(!/^[a-f0-9]{40}$/.test(data.sha)) throw new Error("Unexpected GitHub SHA");
 return data.sha;
}
async function githubZip(repo,sha,env) {
 const res=await fetch("https://api.github.com/repos/"+repo+"/zipball/"+sha,{headers:githubHeaders(env),redirect:"manual"});
 let response=res;
 if([301,302,303,307,308].includes(res.status)) {
  // Never forward authorization to a different host during a redirect.
  const location=res.headers.get("location");
  if(!location) throw new Error("GitHub ZIP redirect missing location");
  const dest=new URL(location);
  if(dest.protocol!=="https:"||dest.hostname!=="codeload.github.com") throw new NonRetryableError("Unexpected GitHub ZIP redirect host");
  response=await fetch(dest.toString(),{redirect:"error"});
 }
 if(!response.ok) {
  const description="GitHub ZIP: "+responseInfo(response);
  if([401,403,404,429].includes(response.status)) throw new NonRetryableError(description);
  throw new Error(description);
 }
 const bytes=await response.arrayBuffer();
 if(bytes.byteLength<32) throw new Error("Invalid ZIP response");
 return bytes;
}
async function d1Export(env,payload) {
 const token=requireExportToken(env);
 if(!/^[0-9a-f]{32}$/i.test(env.ACCOUNT_ID)||!/^[0-9a-f-]{36}$/i.test(env.DATABASE_ID)) throw new Error("Invalid Cloudflare resource identifiers");
 const url="https://api.cloudflare.com/client/v4/accounts/"+env.ACCOUNT_ID+"/d1/database/"+env.DATABASE_ID+"/export";
 const res=await fetch(url,{
   method:"POST",
   headers:{"Authorization":"Bearer "+token,"Content-Type":"application/json"},
   body:JSON.stringify(payload)
 });
 const data=await checkedJson(res,"D1 export");
 if(!data.result) throw new Error("No D1 export result");
 return data.result;
}

export class DailyBackupWorkflow extends WorkflowEntrypoint {
 async run(event,step) {
  const env=this.env;
  if(!env.PRIVATE_BACKUPS) throw new Error("Private backup bucket not bound");
  requireExportToken(env);
  githubHeaders(env);
  const createdAt=new Date().toISOString();
  const prefix=objectPrefix(createdAt,event.instanceId);
  const repo=validateGitHubRepo(env.REPO_FULL_NAME);

  const sha=await step.do("Pin approved GitHub commit",async()=>githubHead(repo,env));
  const github=await step.do("Archive and verify complete public repository files",async()=>{
   const bytes=await githubZip(repo,sha,env);
   return storeVerified(env.PRIVATE_BACKUPS,prefix+"/github-source.zip",bytes,"application/zip");
  });

  const bookmark=await step.do("Start complete D1 database export",async()=>{
   const result=await d1Export(env,{output_format:"polling"});
   if(!result.at_bookmark) throw new Error("D1 export bookmark missing");
   return result.at_bookmark;
  });
  const d1=await step.do("Poll, save and verify complete D1 SQL",{
    retries:{limit:12,delay:"20 seconds",backoff:"linear"},
    timeout:"3 minutes"
  },async()=>{
    const result=await d1Export(env,{output_format:"polling",current_bookmark:bookmark});
    if(result.status==="error") throw new Error("D1 export reported an error");
    // API payloads may expose the export file at result.result.signed_url.
    // Some documented examples show a flattened result.signed_url.
    const signedUrl=result.result?.signed_url??result.signed_url;
    if(!signedUrl) throw new Error("D1 export is still pending");
    const res=await fetch(signedUrl);
    if(!res.ok) throw new Error("D1 SQL download failed: "+res.status);
    const bytes=await res.arrayBuffer();
    return storeVerified(env.PRIVATE_BACKUPS,prefix+"/d1-database.sql",bytes,"application/sql");
  });

  await step.do("Record only fully verified backup manifest",async()=>{
   const manifest={
    schema_version:"1.0.0",status:"complete",created_utc:createdAt,
    repository:repo,github_commit_sha:sha,
    database_id:env.DATABASE_ID,d1_bookmark:bookmark,
    objects:[github,d1],
    not_included:"Full Git history, GitHub Issues/PRs, Cloudflare account settings, reviewer authentication secrets."
   };
   const utf8=new TextEncoder().encode(JSON.stringify(manifest,null,2));
   return storeVerified(env.PRIVATE_BACKUPS,prefix+"/manifest.json",utf8.buffer,"application/json");
  });
 }
}
export default {async fetch(){return new Response("Not found",{status:404})}};
