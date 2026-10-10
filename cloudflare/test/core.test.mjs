import test from "node:test";
import assert from "node:assert/strict";
import {validateProposal,reconcileValues} from "../src/core.mjs";
const sample={category:"assignment_date",target_id:"MGT5311-case-presentation",field:"presentation_at",proposed_value:"2026-10-23",source_type:"student_report"};
test("date without known time is accepted",()=>assert.equal(validateProposal(sample).proposed_value,"2026-10-23"));
test("ambiguous natural-language date is rejected",()=>assert.throws(()=>validateProposal({...sample,proposed_value:"next Friday"}),/Date must/));
test("presentation vs submission must be explicit",()=>assert.throws(()=>validateProposal({...sample,field:"due_date"}),/Unsupported field/));
test("email address blocked",()=>assert.throws(()=>validateProposal({...sample,source_note:"bob@example.com"}),/Remove personal/));
test("secrets blocked",()=>assert.throws(()=>validateProposal({...sample,source_note:"bearer: somevalue"}),/Remove personal/));
test("HTML in target id rejected",()=>assert.throws(()=>validateProposal({...sample,target_id:"<script>"}),/target_id/));
test("duplicates do not approve",()=>{
 const r=reconcileValues([{proposed_value:"2026-10-23"},{proposed_value:"2026-10-23"}]);
 assert.equal(r.report_count,2);assert.equal(r.approved_record_changed,false);
});
test("majority cannot decide contradictory dates",()=>{
 const r=reconcileValues([1,2,3].map(()=>({proposed_value:"2026-10-23"})).concat([{proposed_value:"2026-10-30"}]));
 assert.equal(r.status,"conflicting_reports");assert.equal(r.alternatives.length,2);assert.equal(r.human_review_required,true);
});
test("resource field must match category",()=>assert.throws(()=>validateProposal({...sample,category:"resource"}),/Unsupported field/));
