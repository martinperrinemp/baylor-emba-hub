/* Owner-only check of daily GitHub + D1 backups. No secrets or HTTP access. */
export function utcDate(value) {
 const date = new Date(value);
 if (!Number.isFinite(date.getTime())) throw new Error("Invalid monitoring date");
 return date.toISOString().slice(0,10);
}
export async function digest(bytes) {
 const h=await crypto.subtle.digest("SHA-256",bytes);
 return [...new Uint8Array(h)].map(n=>n.toString(16).padStart(2,"0")).join("");
}
async function manifestsForDate(bucket,day) {
 const prefix="daily/"+day+"/";
 const keys=[];
 let cursor;
 for(let page=0;page<10;page++){
   const list=await bucket.list({prefix,limit:500,...(cursor?{cursor}:{})});
   for(const obj of list.objects??[]) {
     if(obj.key.endsWith("/manifest.json")) keys.push(obj.key);
   }
   if(!list.truncated) return keys.sort().reverse();
   if(!list.cursor || list.cursor===cursor) throw new Error("Invalid R2 pagination cursor");
   cursor=list.cursor;
 }
 throw new Error("Too many backup objects to scan; owner inspection required");
}
export async function validateRun(bucket,manifestKey,day) {
 const prefix="daily/"+day+"/";
 if(!manifestKey.startsWith(prefix)||!manifestKey.endsWith("/manifest.json"))return false;
 const file=await bucket.get(manifestKey);
 if(!file)return false;
 let manifest;
 try{manifest=JSON.parse(await file.text());}catch{return false;}
 if(manifest.status!=="complete"||!manifest.created_utc?.startsWith(day)||!Array.isArray(manifest.objects))return false;
 const runDir=manifestKey.slice(0,-"manifest.json".length);
 const expected=["github-source.zip","d1-database.sql"];
 for(const filename of expected){
   const entry=manifest.objects.find(o=>o?.key===runDir+filename);
   if(!entry||!Number.isSafeInteger(entry.bytes)||entry.bytes<=0||!/^[a-f0-9]{64}$/i.test(entry.sha256??"")) return false;
   const data=await bucket.get(entry.key);
   if(!data||data.size!==entry.bytes)return false;
   if(await digest(await data.arrayBuffer())!==entry.sha256.toLowerCase())return false;
 }
 return true;
}
export async function checkToday(bucket,now=new Date()) {
 if(!bucket)throw new Error("Private backup bucket binding is missing");
 const day=utcDate(now);
 const manifests=await manifestsForDate(bucket,day);
 for(const key of manifests){
   try{
     if(await validateRun(bucket,key,day))return {healthy:true,day,manifest:key};
   }catch(e){
     // Keep checking other complete runs. If none validates, alert.
     console.warn("Backup candidate failed validation:",String(e?.message??e));
   }
 }
 return {healthy:false,day,reason:manifests.length?"Today's manifest(s) or referenced files failed integrity checks":"No completed GitHub and D1 backup manifest exists for today"};
}
export function assertDiscordWebhook(url) {
 if(typeof url!=="string")throw new Error("DISCORD_WEBHOOK_URL secret is not configured");
 let u;
 try{u=new URL(url)}catch{throw new Error("Invalid Discord webhook URL")}
 if(u.protocol!=="https:"||u.hostname!=="discord.com"||!/^\/api\/webhooks\/[0-9]{10,25}\/[a-zA-Z0-9._-]{15,250}$/.test(u.pathname)||u.username||u.password||u.hash||u.search)throw new Error("Discord webhook URL is not a standard discord.com webhook");
 return url;
}
export async function sendDiscord(webhookUrl,content,fetcher=fetch) {
 const uri=assertDiscordWebhook(webhookUrl);
 const res=await fetcher(uri,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"Baylor EMBA Backup Watchdog",content,allowed_mentions:{parse:[]}})});
 if(!res.ok)throw new Error("Discord webhook delivery failed (HTTP "+res.status+")");
 return true;
}
