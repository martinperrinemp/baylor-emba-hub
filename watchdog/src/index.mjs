/** Cloudflare Worker Cron handler. No public HTTP interface. */
import {checkToday,assertDiscordWebhook,sendDiscord,utcDate} from "./check.mjs";

export async function runWatchdog(env,now=new Date()) {
 // This token never leaves Cloudflare secrets. No public HTTP routes.
 const webhook=assertDiscordWebhook(env.DISCORD_WEBHOOK_URL);
 const test=env.WATCHDOG_TEST_MODE==="true";
 const day=utcDate(now);
 let result;
 try{result=await checkToday(env.PRIVATE_BACKUPS,now);}
 catch(e){
   result={healthy:false,day,reason:"Backup verification could not complete: "+String(e?.message??e).slice(0,140)};
 }
 if(result.healthy && !test)return {state:"healthy",day,alert_sent:false};

 const type=test?"test":"missing-backup";
 // Marker stored privately, expires under owner-configured eight-day lifecycle.
 const key="watchdog/alerts/"+day+"-"+type+".json";
 // Repeat schedule executions never post the same alert twice successfully.
 if(await env.PRIVATE_BACKUPS.head(key))return {state:"already_notified",day,alert_sent:false};

 const message=test
  ?"🧪 **TEST: Baylor EMBA Backup Watchdog**\nThis is a test alert. Discord delivery is working. "+
    (result.healthy?"Today's complete GitHub + D1 backup was also verified.":"Today's backup is NOT verified: "+result.reason)
  :"🚨 **Baylor EMBA BACKUP WARNING**\nNo verified complete GitHub + D1 backup for **"+day+" (UTC)**. "+
    result.reason+". Check the private R2 bucket and Cloudflare Workflow **baylor-emba-backup-workflow**. "+
    "Cohort submissions should remain disabled until backups are healthy.";
 await sendDiscord(webhook,message);
 await env.PRIVATE_BACKUPS.put(key,JSON.stringify({notified_at:new Date().toISOString(),date_utc:day,type,health:result.healthy}),{httpMetadata:{contentType:"application/json"}});
 return {state:test?"test_sent":"alert_sent",day,alert_sent:true};
}
export default {
 async fetch(){return new Response("Not found",{status:404});},
 async scheduled(controller,env) {
   // Fail in Cloudflare Worker logs if Discord delivery fails.
   const result=await runWatchdog(env,new Date(controller.scheduledTime||Date.now()));
   console.log("Baylor EMBA watchdog:",result.state,result.day);
 }
};
