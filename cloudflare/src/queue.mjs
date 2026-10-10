import {validateProposal,reconcileValues} from "./core.mjs";
const MAX_PER_DAY=30;
const MAX_GROUP=500;
async function clientFingerprint(request,env) {
 const ip=request.headers.get("CF-Connecting-IP")||"unknown-client";
 const pepper=env.RATE_LIMIT_SALT;
 if(!pepper||pepper.length<16) throw new Error("RATE_LIMIT_SALT must be configured before deployment");
 const buf=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(pepper+":"+ip));
 return [...new Uint8Array(buf)].map(x=>x.toString(16).padStart(2,"0")).join("");
}
export async function submitProposal(env,request,payload) {
 // Owner-controlled fail-closed emergency stop. Applies to REST AND MCP.
 // No validation, rate-limit mutation, or D1 writes occur while paused.
 if(env.INTAKE_ENABLED!=="true") return {ok:false,http_status:503,error:"Cohort submissions are temporarily paused by the hub owner. No approved data has changed."};
 const p=validateProposal(payload);
 if(!env.DB) throw new Error("D1 database binding DB missing");
 const fingerprint=await clientFingerprint(request,env);
 const today=new Date().toISOString().slice(0,10);
 const count=await env.DB.prepare(`INSERT INTO submission_counters (fingerprint,date_utc,count) VALUES (?,?,1)
   ON CONFLICT(fingerprint,date_utc) DO UPDATE SET count=count+1 WHERE count<? RETURNING count`)
   .bind(fingerprint,today,MAX_PER_DAY).first();
 if(!count) return {ok:false,http_status:429,error:"Submission limit reached; try tomorrow"};
 const id=crypto.randomUUID();
 const submitted_at=new Date().toISOString();
 const insert=await env.DB.prepare(`INSERT OR IGNORE INTO proposals
  (id,client_request_id,category,target_id,field,proposed_value,current_value,source_type,source_note,status,submitted_at)
  VALUES (?,?,?,?,?,?,?,?,?,'pending',?)`)
  .bind(id,p.client_request_id,p.category,p.target_id,p.field,p.proposed_value,p.current_value,p.source_type,p.source_note,submitted_at).run();
 const original=p.client_request_id?await env.DB.prepare("SELECT id FROM proposals WHERE client_request_id=?").bind(p.client_request_id).first():null;
 const proposal_id=original?.id??id;
 const group=await env.DB.prepare(`SELECT proposed_value FROM proposals WHERE category=? AND target_id=? AND field=? AND status='pending' LIMIT ?`)
  .bind(p.category,p.target_id,p.field,MAX_GROUP).all();
 const reconciliation=reconcileValues(group.results??[]);
 return {ok:true,http_status:202,proposal_id,state:"queued_for_review",duplicate_retry:!insert.meta?.changes,
  ...reconciliation,message:"Your agent submitted a proposal only; the approved shared record has NOT been changed."};
}
export async function getProposalStatus(env,id) {
 if(!/^[0-9a-f-]{36}$/i.test(id)) return {ok:false,http_status:400,error:"Invalid proposal ID"};
 const row=await env.DB.prepare("SELECT id,status,submitted_at FROM proposals WHERE id=?").bind(id).first();
 if(!row) return {ok:false,http_status:404,error:"Proposal not found"};
 return {ok:true,proposal_id:row.id,status:row.status,submitted_at:row.submitted_at,approved_record_changed:row.status==="approved"};
}
