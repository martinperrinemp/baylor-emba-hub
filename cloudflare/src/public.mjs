/** Public, read-only, strictly allowlisted snapshots of approved GitHub data.
 * No D1 access, no Canvas, no secrets and no writes. */
export const PUBLIC_DATA_FILES = Object.freeze([
  "manifest.json",
  "assignments.json",
  "resources.json",
  "ai-policies.json",
  "changes.json",
  "open-alerts.json",
  "lessons-learned.json"
]);
const REPO = "martinperrinemp/baylor-emba-hub";
export async function publicDataResponse(filename, fetcher = fetch) {
  if (!PUBLIC_DATA_FILES.includes(filename)) {
    return Response.json({ok:false,error:"Unknown public data file"},{status:404,headers:{"Cache-Control":"no-store"}});
  }
  try {
    // Repository content is public and explicitly reviewed before publication.
    // The fixed allowlist prevents arbitrary URL fetches (SSRF).
    const uri="https://raw.githubusercontent.com/"+REPO+"/main/data/"+filename;
    const remote=await fetcher(uri,{
      headers:{"Accept":"application/json","User-Agent":"baylor-emba-cohort-hub/1.0"},
      cf:{cacheEverything:true,cacheTtl:60}
    });
    if (!remote.ok) throw new Error("Public GitHub snapshot unavailable");
    const contentLength=Number(remote.headers.get("content-length")||"0");
    if (contentLength>256000)throw new Error("Public data file too large");
    const body=await remote.text();
    if(body.length>256000)throw new Error("Public data file too large");
    const parsed=JSON.parse(body);
    if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))throw new Error("Unexpected public JSON shape");
    return Response.json(parsed,{headers:{
      "Cache-Control":"public, max-age=60, s-maxage=60",
      "Access-Control-Allow-Origin":"*",
      "X-Content-Type-Options":"nosniff"
    }});
  } catch {
    return Response.json({ok:false,error:"Public GitHub data could not be checked right now. Verify deadlines in official course instructions."},{
      status:502,
      headers:{"Cache-Control":"no-store","Access-Control-Allow-Origin":"*"}
    });
  }
}
