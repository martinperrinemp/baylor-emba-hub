import test from "node:test";
import assert from "node:assert/strict";
import {checkToday,assertDiscordWebhook,digest} from "../src/check.mjs";
import {runWatchdog} from "../src/index.mjs";

function mockBucket(day) {
 const data=new Map();
 const enc=new TextEncoder();
 const base="daily/"+day+"/"+day+"T09-00-00.000Z-test/";
 const zip=enc.encode("GitHub ZIP test body");
 const sql=enc.encode("CREATE TABLE proposals(id TEXT);");
 return {
  data,
  base,
  async populate(){
    const a=[{key:base+"github-source.zip",bytes:zip.byteLength,sha256:await digest(zip.buffer)},{key:base+"d1-database.sql",bytes:sql.byteLength,sha256:await digest(sql.buffer)}];
    data.set(a[0].key,zip);
    data.set(a[1].key,sql);
    data.set(base+"manifest.json",enc.encode(JSON.stringify({status:"complete",created_utc:day+"T09:00:00Z",objects:a})));
  },
  async list({prefix,cursor}){
    if(cursor)throw new Error("No extra page");
    return {objects:[...data.keys()].filter(x=>x.startsWith(prefix)).map(key=>({key})),truncated:false};
  },
  async get(key){
    const b=data.get(key);return b?{size:b.byteLength,async arrayBuffer(){return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)},async text(){return new TextDecoder().decode(b)}}:null;
  },
  async head(key){const b=data.get(key);return b?{size:b.byteLength}:null;},
  async put(key,value){data.set(key,new TextEncoder().encode(String(value)));return {key}}
 };
}
const at=new Date("2026-10-11T12:00:00Z"), day="2026-10-11";
const url="https://discord.com/api/webhooks/123456789012345678/abcdeABCDE1234567890123456789";
test("finds and validates complete current day backup",async()=>{const bucket=mockBucket(day);await bucket.populate();assert.equal((await checkToday(bucket,at)).healthy,true)});
test("missing backup is unhealthy",async()=>{assert.equal((await checkToday(mockBucket(day),at)).healthy,false)});
test("partial ZIP alone is unhealthy",async()=>{const b=mockBucket(day);b.data.set(b.base+"github-source.zip",new TextEncoder().encode("zip"));assert.equal((await checkToday(b,at)).healthy,false)});
test("tampered D1 file invalidates manifest",async()=>{const b=mockBucket(day);await b.populate();b.data.set(b.base+"d1-database.sql",new TextEncoder().encode("fake data"));assert.equal((await checkToday(b,at)).healthy,false)});
test("rejects malicious webhook host",()=>assert.throws(()=>assertDiscordWebhook("https://evil.example/api/webhooks/123/secret"),/webhook URL/));
test("rejects query-bearing webhook URL",()=>assert.throws(()=>assertDiscordWebhook(url+"?token=oops"),/webhook URL/));
test("accepts standard Discord webhook URL",()=>assert.equal(assertDiscordWebhook(url),url));
test("healthy backup does not send any Discord message",async()=>{
 const b=mockBucket(day);await b.populate();
 const r=await runWatchdog({PRIVATE_BACKUPS:b,DISCORD_WEBHOOK_URL:url,WATCHDOG_TEST_MODE:"false"},at);
 assert.equal(r.state,"healthy");assert.equal(r.alert_sent,false);
});
test("missing daily backup sends one alert and deduplicates future runs",async()=>{
 const b=mockBucket(day);
 const previous=globalThis.fetch;let sent=0;
 globalThis.fetch=async(_url,opts)=>{sent++;const body=JSON.parse(opts.body);assert.deepEqual(body.allowed_mentions,{parse:[]});return {ok:true}};
 try{
  const env={PRIVATE_BACKUPS:b,DISCORD_WEBHOOK_URL:url,WATCHDOG_TEST_MODE:"false"};
  const a=await runWatchdog(env,at),second=await runWatchdog(env,at);
  assert.equal(a.state,"alert_sent");assert.equal(second.state,"already_notified");assert.equal(sent,1);
 }finally{globalThis.fetch=previous}
});
test("test mode sends labeled test even if backup healthy",async()=>{
 const b=mockBucket(day);await b.populate();
 const previous=globalThis.fetch;let content;
 globalThis.fetch=async(_url,opts)=>{content=JSON.parse(opts.body).content;return {ok:true}};
 try{const r=await runWatchdog({PRIVATE_BACKUPS:b,DISCORD_WEBHOOK_URL:url,WATCHDOG_TEST_MODE:"true"},at);assert.equal(r.state,"test_sent");assert.match(content,/TEST: Baylor/)}
 finally{globalThis.fetch=previous}
});
test("Discord delivery failure does not set deduplication marker",async()=>{
 const b=mockBucket(day);
 const previous=globalThis.fetch;
 globalThis.fetch=async()=>({ok:false,status:429});
 try{await assert.rejects(runWatchdog({PRIVATE_BACKUPS:b,DISCORD_WEBHOOK_URL:url,WATCHDOG_TEST_MODE:"false"},at),/delivery failed/);assert.equal(b.data.has("watchdog/alerts/"+day+"-missing-backup.json"),false)}
 finally{globalThis.fetch=previous}
});
