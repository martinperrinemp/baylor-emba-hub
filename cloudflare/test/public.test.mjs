import test from "node:test";
import assert from "node:assert/strict";
import {publicDataResponse,PUBLIC_DATA_FILES} from "../src/public.mjs";

test("Only explicitly public JSON filenames can be retrieved",async()=>{
 let fetched=false;
 const r=await publicDataResponse("../private/secrets.json",async()=>{fetched=true;return new Response("{}");});
 assert.equal(r.status,404);
 assert.equal(fetched,false);
 assert.deepEqual(PUBLIC_DATA_FILES.includes("assignments.json"),true);
});

test("Serves allowed GitHub JSON with short-lived public caching",async()=>{
 let requested="";
 const r=await publicDataResponse("assignments.json",async url=>{
  requested=url;
  return new Response('{"schema_version":"1.0.0","records":[]}',{status:200,headers:{"content-length":"41"}});
 });
 assert.equal(r.status,200);
 assert.deepEqual((await r.json()).records,[]);
 assert.equal(r.headers.get("access-control-allow-origin"),"*");
 assert.match(r.headers.get("cache-control"),/max-age=60/);
 assert.equal(requested,"https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/assignments.json");
});

test("Failures fail closed instead of inventing public dates",async()=>{
 const r=await publicDataResponse("assignments.json",async()=>new Response("blocked",{status:403}));
 assert.equal(r.status,502);
 assert.match((await r.json()).error,/could not be checked/);
});
test("Invalid and oversize JSON cannot populate the public endpoint",async()=>{
 const invalid=await publicDataResponse("manifest.json",async()=>new Response("<html>invalid</html>"));
 assert.equal(invalid.status,502);
 const oversized=await publicDataResponse("assignments.json",async()=>new Response("{}",{headers:{"content-length":"300000"}}));
 assert.equal(oversized.status,502);
});
