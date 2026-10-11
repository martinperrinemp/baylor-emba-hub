import test from "node:test";
import assert from "node:assert/strict";
import {validateGitHubRepo,objectPrefix,sha256Hex,storeVerified,requireExportToken} from "../src/helpers.mjs";
test("accepts public hub repository id",()=>assert.equal(validateGitHubRepo("martinperrinemp/baylor-emba-hub"),"martinperrinemp/baylor-emba-hub"));
test("rejects malformed repository id",()=>assert.throws(()=>validateGitHubRepo("../../private"),/Invalid/));
test("stable date prefix",()=>assert.match(objectPrefix("2026-10-11T09:00:00Z","abc-123"),/^daily\/2026-10-11\/2026-10-11T09-00-00.000Z-abc-123$/));
test("requires export secret",()=>assert.throws(()=>requireExportToken({}),/not configured/));
test("SHA256 digest",async()=>assert.equal(await sha256Hex(new TextEncoder().encode("abc").buffer),"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"));
test("save and verify R2 readback",async()=>{
 const map=new Map(),bucket={async put(key,bytes){map.set(key,bytes.slice(0))},async get(key){return map.has(key)?{async arrayBuffer(){return map.get(key).slice(0)}}:null}};
 const result=await storeVerified(bucket,"daily/sample",new TextEncoder().encode("test backup data").buffer,"text/plain");
 assert.equal(result.bytes,16);
});
test("detects corrupt backup",async()=>{
 const bucket={async put(){},async get(){return {async arrayBuffer(){return new TextEncoder().encode("wrong").buffer}}}};
 await assert.rejects(storeVerified(bucket,"daily/sample",new TextEncoder().encode("valid").buffer,"text/plain"),/checksum/);
});
