import test from "node:test";
import assert from "node:assert/strict";
import {submitProposal} from "../src/queue.mjs";
const sample={category:"assignment_date",target_id:"MGT5311-case-presentation",field:"presentation_at",proposed_value:"2026-10-23",source_type:"student_report",client_request_id:"unique-request-abc123"};
function fakeDB(){
 const state={proposals:[],requests:0};
 return {state,prepare(sql){
  let args=[];
  return {bind(...values){args=values;return this;},
   async first(){
    if(sql.includes("submission_counters")) return {count:++state.requests};
    if(sql.includes("WHERE client_request_id")) return state.proposals.find(p=>p.client_request_id===args[0])??null;
    return null;
   },
   async run(){
    const [id,client_request_id,category,target_id,field,proposed_value,current_value,source_type,source_note,submitted_at]=args;
    if(client_request_id&&state.proposals.some(p=>p.client_request_id===client_request_id)) return {meta:{changes:0}};
    state.proposals.push({id,client_request_id,category,target_id,field,proposed_value,current_value,source_type,source_note,submitted_at,status:"pending"});
    return {meta:{changes:1}};
   },
   async all(){return {results:state.proposals.filter(p=>p.category===args[0]&&p.target_id===args[1]&&p.field===args[2]&&p.status==="pending").slice(0,args[3])};}
  };
 }};
}
const req=()=>new Request("https://example.workers.dev/api/proposals",{headers:{"CF-Connecting-IP":"192.0.2.1"}});
const env=DB=>({DB,RATE_LIMIT_SALT:"test-salt-of-sufficient-length"});
test("queued changes do not update canonical deadlines",async()=>{
 const DB=fakeDB(),r=await submitProposal(env(DB),req(),sample);
 assert.equal(r.http_status,202);assert.equal(r.approved_record_changed,false);assert.equal(DB.state.proposals.length,1);
});
test("repeat requests are idempotent",async()=>{
 const DB=fakeDB(),e=env(DB),first=await submitProposal(e,req(),sample),second=await submitProposal(e,req(),sample);
 assert.equal(first.proposal_id,second.proposal_id);assert.equal(second.duplicate_retry,true);assert.equal(DB.state.proposals.length,1);
});
test("conflicts remain unresolved",async()=>{
 const DB=fakeDB(),e=env(DB);
 await submitProposal(e,req(),sample);
 const r=await submitProposal(e,req(),{...sample,client_request_id:"another-unique-xyz789",proposed_value:"2026-10-30"});
 assert.equal(r.status,"conflicting_reports");assert.equal(r.approved_record_changed,false);assert.equal(r.alternatives.length,2);
});
