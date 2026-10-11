/**
 * Owner-only backup Workflow. NO public endpoints.
 * Each completed backup contains:
 * - a pinned GitHub source ZIP (not full Git history/Issues)
 * - a complete D1 SQL export
 * - a checksummed manifest committed last
 * Scheduled execution is disabled until permissions and restore tests pass.
 */
import {WorkflowEntrypoint} from "cloudflare:workers";
import {objectPrefix,requireExportToken,storeVerified,validateGitHubRepo} from "./helpers.mjs";

const HEADERS={"Accept":"application/vnd.github+json","User-Agent":"baylor-emba-owner-backup/0.1"};
async function checkedJson(res,action) {
 if(!res.ok) throw new Error(action+": HTTP "+res.status);
 const data=await res.json();
 if(data?.success===false) throw new Error(action+": API error");
 return data;
}
async function githubHead(repo) {
 validateGitHubRepo(repo);
 const data=await checkedJson(await fetch("https://api.github.com/repos/"+repo+"/commits/main",{headers:HEADERS}),"GitHub HEAD");
 if(!/^[a-f0-9]{40}$/.test(data.sha)) throw new Error("Unexpected GitHub SHA");
 return data.sha;
}
async function githubZip(repo,sha) {
 const res=await fetch("https://api.github.com/repos/"+repo+"/zipball/"+sha,{headers:HEADERS});
 if(!res.ok) throw new Error("GitHub ZIP download failed: "+res.status);
 const bytes=await res.arrayBuffer();
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
  const createdAt=new Date().toISOString();
  const prefix=objectPrefix(createdAt,event.instanceId);
  const repo=validateGitHubRepo(env.REPO_FULL_NAME);

  const sha=await step.do("Pin approved GitHub commit",async()=>githubHead(repo));
  const github=await step.do("Archive and verify complete public repository files",async()=>{
   const bytes=await githubZip(repo,sha);
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
    if(!result.signed_url) throw new Error("D1 export is still pending");
    const res=await fetch(result.signed_url);
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
