/* Browser-only display of public shared data. No user accounts or progress storage. */
"use strict";
const BASE="https://github.com/martinperrinemp/baylor-emba-hub";
const PROMPT=[
 "Help me as my personal Dallas Executive MBA assistant using the unofficial cohort hub:",
 BASE,
 "First, read AGENTS.md, then fetch FRESH data/manifest.json, data/open-alerts.json, data/changes.json, data/assignments.json and data/ai-policies.json.",
 "Use approved metadata only. Clearly distinguish verified dates, unverified student reports, presentation dates and actual submission deadlines. If no verified assignments exist or you cannot retrieve them, say so instead of inventing deadlines.",
 "Official course materials and instructor directions outrank this hub. Do not connect or scrape Canvas.",
 "Keep my own completions, notes, grades, preferences and personal checkpoints private, separate from the public repository. Mark an assignment completed/submitted only after I confirm it.",
 "Tell me what has changed since my last verified revision if known; otherwise give me a careful list of currently available information and ask what I am working on.",
 "Do not submit a proposal, change shared data, or claim that information was refreshed unless an authorized tool actually did it."
].join("\n\n");
const CORRECTION=[
 "Unofficial EMBA Hub correction suggestion (not yet verified)",
 "Course / assignment:",
 "Exact field (presentation date, submission due date, requirement, AI-use rule, resource):",
 "Currently published value (or missing):",
 "Suggested replacement and timezone (if relevant):",
 "Safe, short description of evidence and date checked:",
 "Uncertainty / what still needs verification:",
 "Do not include personal student details, private instructor messages, restricted case text, grades, or secret links."
].join("\n");
const $=id=>document.getElementById(id);
const text=(el,value)=>{el.textContent=String(value??"");return el;};
function elt(name,className,content) {const e=document.createElement(name);if(className)e.className=className;if(content!==undefined)text(e,content);return e;}
function emptyMessage(container,title,detail){
 const card=elt("div","empty");card.append(elt("strong","",title),elt("span","",detail));container.replaceChildren(card);
}
async function copyToClipboard(value,label){
 try{
  if(!navigator.clipboard||!window.isSecureContext)throw new Error("Clipboard unavailable");
  await navigator.clipboard.writeText(value);
  text($("copy-status"),label+" copied. Paste it into the destination you choose.");
 }catch {
  const target=document.createElement("textarea");target.value=value;target.setAttribute("readonly","");target.style.cssText="position:fixed;top:-9999px;left:-9999px";document.body.append(target);
  target.select();
  const worked=document.execCommand("copy");target.remove();
  text($("copy-status"),worked?label+" copied. Paste it into the destination you choose.":"Please copy the content directly from "+BASE+"/blob/main/docs/AGENT-ONBOARDING.md");
 }
}
function isReviewed(record){
 return ["approved","verified","source_verified","reviewed"].includes(String(record.verification_status??"").toLowerCase());
}
function safeDate(raw) {
 if(typeof raw!=="string"||!/^\d{4}-\d{2}-\d{2}/.test(raw))return "";
 const dateOnly=/^\d{4}-\d{2}-\d{2}$/.test(raw);
 const d=new Date(dateOnly?raw+"T12:00:00-05:00":raw);
 if(!Number.isFinite(d.getTime()))return raw;
 const formatted=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",...(dateOnly?{}:{hour:"numeric",minute:"2-digit",timeZone:"America/Chicago",timeZoneName:"short"})}).format(d);
 return formatted;
}
function deadlineFor(item){
 return item.submission_due_at || item.official_due_at || item.presentation_at || null;
}
function kindFor(item) {
 return item.submission_due_at?"Submission":item.official_due_at?"Due":item.presentation_at?"Presentation":"Date not verified";
}
function renderAssignments(data){
 const container=$("assignment-list");
 const recs=Array.isArray(data?.records)?data.records:[];
 const reviewed=recs.filter(isReviewed);
 const filter=$("course-filter");
 const courseCodes=[...new Set(recs.map(r=>r.course_id||r.course||"").filter(Boolean))].sort();
 for(const course of courseCodes){const option=elt("option","",course);option.value=course;filter.append(option);}
 const render=()=>{
  const selected=filter.value;
  const filtered=recs.filter(r=>selected==="all"||(r.course_id||r.course)===selected).slice().sort((a,b)=>String(deadlineFor(a)||"9999").localeCompare(String(deadlineFor(b)||"9999")));
  if(!filtered.length){
   emptyMessage(container,"No reviewed assignment deadlines published yet.","The course records are still being verified. Please rely on official course materials for deadlines while this hub is populated.");
   return;
  }
  const fragment=document.createDocumentFragment();
  for(const item of filtered){
   const card=elt("article","assignment");
   const info=elt("div");const badge=elt("span","pill "+(isReviewed(item)?"":"candidate"),isReviewed(item)?"Reviewed":"Needs verification");
   const heading=elt("h3","",item.title||item.assignment_title||"Untitled assignment");
   const course=elt("p","",String(item.course_id||item.course||"Course not specified"));
   info.append(badge,heading,course);
   if(item.verification_status&&!isReviewed(item))info.append(elt("p","","Unverified information. Confirm in your course."));
   const dates=elt("div","date-group");dates.append(elt("strong","",kindFor(item)),elt("div","",safeDate(deadlineFor(item))||"Not confirmed"));
   if(item.presentation_at&&item.submission_due_at)dates.append(elt("div","", "Presentation: "+safeDate(item.presentation_at)));
   card.append(info,dates);fragment.append(card);
  }
  container.replaceChildren(fragment);
 };
 filter.addEventListener("change",render);render();
 text($("record-count"),String(reviewed.length));
 if(!reviewed.length) text($("data-status"),"No officially reviewed dates have been entered in the cohort catalog. This is a working pilot, not yet an authoritative assignment calendar.");
 else text($("data-status"),"Showing public records. Check the status on each item and confirm consequential deadlines in Canvas.");
}
function renderResources(data) {
 const parent=$("resource-list");const rows=Array.isArray(data?.resources)?data.resources:[];
 if(!rows.length){emptyMessage(parent,"No shared resources yet.","Resources will appear once student contributors submit and reviewers approve them.");return;}
 const nodes=[];
 for(const row of rows){
  const box=elt("article","resource");
  const isKnown=["verified","approved","reviewed"].includes(String(row.verification_status??"").toLowerCase());
  box.append(elt("span","pill "+(isKnown?"":"candidate"),isKnown?"Reviewed resource":"Candidate · check before use"));
  box.append(elt("h3","",row.title||"Untitled resource"),elt("p","",row.description||"No description submitted."));
  if(row.ai_tool)box.append(elt("p","","AI use may be restricted for particular assignments. Check official rules."));
  if(typeof row.url==="string" && /^https:\/\/[^\s]+$/i.test(row.url)){
   const a=elt("a","","Open resource ↗");a.href=row.url;a.rel="noopener noreferrer";a.target="_blank";box.append(a);
  }else box.append(elt("p","","Link not yet verified."));
  nodes.push(box);
 }
 parent.replaceChildren(...nodes);
}
function renderChanges(data,alerts){
 const c=$("change-list"),a=$("alert-list");const changes=Array.isArray(data?.changes)?data.changes:[];
 if(!changes.length)emptyMessage(c,"No approved changes yet.","When a change is verified and published, it will appear here.");
 else{
  c.replaceChildren(...changes.slice(-8).reverse().map(r=>{
   const item=elt("article","change-item");item.append(elt("strong","",r.title||r.field||"Approved change"),elt("span","",r.summary||r.description||"A reviewed update was published."));return item;
  }));
 }
 const items=Array.isArray(alerts?.alerts)?alerts.alerts:[];
 text($("alerts-count"),String(items.length));
 if(!items.length)a.replaceChildren();
 else a.replaceChildren(...items.slice(0,5).map(r=>elt("div","alert-item","UNVERIFIED ALERT: "+(r.summary||r.title||"Unresolved information reported. Check official sources."))));
}
async function loadFile(name) {
 const res=await fetch("/api/public/"+name,{cache:"no-store"});
 if(!res.ok)throw new Error("Could not retrieve "+name);
 return res.json();
}
async function boot(){
 $("copy-prompt").addEventListener("click",()=>copyToClipboard(PROMPT,"AI starter prompt"));
 $("copy-correction").addEventListener("click",()=>copyToClipboard(CORRECTION,"Correction template"));
 const [manifest,assignments,resources,changes,alerts]=await Promise.allSettled([
  loadFile("manifest.json"),loadFile("assignments.json"),loadFile("resources.json"),loadFile("changes.json"),loadFile("open-alerts.json")
 ]);
 const has=m=>m.status==="fulfilled";
 if(has(manifest)){
  const info=manifest.value;
  text($("revision"),String(info.knowledge_revision??"Unknown"));
  text($("updated"),String(info.updated_at||"Not recorded"));
 }else{
  text($("revision"),"Unavailable");text($("updated"),"Could not verify current GitHub revision");
 }
 if(has(assignments))renderAssignments(assignments.value);
 else{text($("record-count"),"Unavailable");text($("data-status"),"Live records could not be checked. Do not rely on this hub for deadlines.");emptyMessage($("assignment-list"),"Data temporarily unavailable","Confirm your assignments in official course systems.");}
 if(has(resources))renderResources(resources.value);
 else emptyMessage($("resource-list"),"Resources temporarily unavailable","You can still browse the source repository using the links below.");
 renderChanges(has(changes)?changes.value:{},has(alerts)?alerts.value:{});
 if(!has(manifest)||!has(assignments)||!has(alerts))text($("data-status"),"Some public data could not be verified. Please check official course instructions.");
}
boot();
