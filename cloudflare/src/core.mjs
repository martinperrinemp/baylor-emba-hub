/** Shared validation and reconciliation helpers. Never approves changes. */
export const CATEGORIES = ["assignment_date","assignment_requirement","ai_policy","resource","lesson"];
export const SOURCE_TYPES = ["instructor_announcement","syllabus","canvas_manually_checked","student_report","other_unknown"];
export const FIELDS = {
  assignment_date:["presentation_at","submission_due_at","official_due_at"],
  assignment_requirement:["requirement","dependency"],
  ai_policy:["allowed_uses","prohibited_uses","disclosure_required"],
  resource:["url","description"], lesson:["description"]
};
const PRIVATE_PATTERN = /(?:\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|(?:password|bearer|api[_ -]?key|secret|access[_ -]?token|sys:email|sys:birthdate)\s*[:=])/i;
const URL_TOKEN_PATTERN = /(?:https?:\/\/\S*[?&](?:token|access_token|key|api_key|auth|signature|sig|code)=)/i;
export function validateProposal(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("A JSON object is required");
  const {category,target_id,field,proposed_value,source_type,source_note="",current_value=null,client_request_id=null}=payload;
  if (!CATEGORIES.includes(category)) throw new Error("Unsupported category");
  if (typeof target_id!=="string" || !/^[a-zA-Z0-9][a-zA-Z0-9._:-]{2,95}$/.test(target_id)) throw new Error("target_id must be a stable assignment or resource identifier");
  if (!FIELDS[category].includes(field)) throw new Error("Unsupported field for category");
  if (!SOURCE_TYPES.includes(source_type)) throw new Error("Unsupported source_type");
  if (typeof proposed_value!=="string" || !proposed_value.trim() || proposed_value.length>600) throw new Error("proposed_value must be 1 to 600 characters");
  if (current_value!==null && (typeof current_value!=="string" || current_value.length>600)) throw new Error("Invalid current_value");
  if (typeof source_note!=="string" || source_note.length>400) throw new Error("Source note must be at most 400 characters");
  if (client_request_id!==null && (typeof client_request_id!=="string" || !/^[a-zA-Z0-9_-]{8,100}$/.test(client_request_id))) throw new Error("Invalid client_request_id");
  for(const s of [proposed_value,source_note,current_value??""]) if(PRIVATE_PATTERN.test(s)||URL_TOKEN_PATTERN.test(s)) throw new Error("Remove personal information, passwords, tokens, and private URLs before submitting");
  if(category==="assignment_date" && !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2}))?$/.test(proposed_value)) throw new Error("Date must be YYYY-MM-DD, or ISO date-time with timezone offset. Never invent an unknown time.");
  return {category,target_id,field,proposed_value:proposed_value.trim(),current_value:current_value?.trim()??null,source_type,source_note:source_note.trim(),client_request_id};
}
export function reconcileValues(values) {
  const alternatives=[...new Set(values.map(v=>v.proposed_value))].sort();
  return {status:alternatives.length>1?"conflicting_reports":"awaiting_evidence_and_review",alternatives,report_count:values.length,approved_record_changed:false,human_review_required:true};
}
export function safeProblem(message,status=400) {
  return Response.json({ok:false,error:message},{status,headers:{"Cache-Control":"no-store"}});
}
