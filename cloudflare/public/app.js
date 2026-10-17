/* Browser-only display of public shared data. No user accounts or progress storage. */
"use strict";
const BASE="https://github.com/martinperrinemp/baylor-emba-hub";
const PROMPT=[
 "Help me as my personal Dallas Executive MBA assistant using the unofficial cohort hub:",
 BASE,
 "First, read AGENTS.md, then fetch FRESH data/manifest.json, data/open-alerts.json, data/changes.json, data/assignments.json, data/prep.json, data/program-calendar.json and data/ai-policies.json.",
 "Use verified metadata for confirmed claims. You may show provisional Fall 2026 assignment and prep records only as UNVERIFIED leads with clear warnings; never present them as authoritative due dates. Distinguish preparation/discussion dates, presentation dates and actual submission deadlines. If no verified dates exist or you cannot retrieve current records, say so and do not invent dates.",
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
 // Date-only values are calendar dates, not UTC instants. Never shift them
 // to a different day based on the classmate's device timezone.
 if(dateOnly){
  const [year,month,day]=raw.split("-").map(Number);
  const calendarDate=new Date(Date.UTC(year,month-1,day,12));
  return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"}).format(calendarDate);
 }
 const d=new Date(raw);
 if(!Number.isFinite(d.getTime()))return raw;
 return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",timeZone:"America/Chicago",timeZoneName:"short"}).format(d);
}
function deadlineFor(item){
 return item.submission_due_at || item.official_due_at || item.presentation_at || null;
}
function kindFor(item) {
 return item.submission_due_at?"Submission":item.official_due_at?"Due":item.presentation_at?"Presentation":"Date not verified";
}
function todayChicago(){
 const parts=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",timeZone:"America/Chicago"}).formatToParts(new Date());
 const get=type=>parts.find(p=>p.type===type)?.value;
 return get("year")+"-"+get("month")+"-"+get("day");
}
function renderAssignments(data){
 const container=$("assignment-list");
 const recs=(Array.isArray(data?.records)?data.records:[]).filter(r=>r.record_status!=="superseded_aggregate");
 const reviewed=recs.filter(isReviewed);
 const filter=$("course-filter");
 const dateFilter=$("date-filter");
 const chicagoDay=todayChicago();
 const courseCodes=[...new Set(recs.map(r=>r.course_id||r.course||"").filter(Boolean))].sort();
 for(const course of courseCodes){const option=elt("option","",course);option.value=course;filter.append(option);}
 const render=()=>{
  const selected=filter.value;
  const filtered=recs.filter(r=>(selected==="all"||(r.course_id||r.course)===selected)&&(dateFilter.value==="all"||!deadlineFor(r)||String(deadlineFor(r)).slice(0,10)>=chicagoDay)).slice().sort((a,b)=>String(deadlineFor(a)||"9999").localeCompare(String(deadlineFor(b)||"9999")));
  if(!filtered.length){
   emptyMessage(container,"No matching assignment dates.",dateFilter.value==="upcoming"?"Try All dates or another course. Official Canvas deadlines always take priority.":"No class record matches these filters.");
   return;
  }
  const fragment=document.createDocumentFragment();
  for(const item of filtered){
   const card=elt("article","assignment");
   const info=elt("div");const badge=elt("span","pill "+(isReviewed(item)?"":"candidate"),isReviewed(item)?"Reviewed":item.verification_status==="conflicted"?"Dates conflict · verify":"Provisional · verify");
   const heading=elt("h3","",item.title||item.assignment_title||"Untitled assignment");
   const course=elt("p","",String(item.course_id||item.course||"Course not specified"));
   info.append(badge,heading,course);
   if(item.verification_status&&!isReviewed(item)){
     info.append(elt("p","","Student-maintained schedule; check the official assignment instructions."));
   }
   if(item.source_reference){
     const source=document.createElement("details");
     const summary=elt("summary","","Source and verification notes");
     source.append(summary,elt("p","",item.source_reference));info.append(source);
   }
   const dates=elt("div","date-group");dates.append(elt("strong","",kindFor(item)),elt("div","",safeDate(deadlineFor(item))||"Not confirmed"));
   if(item.presentation_at&&item.submission_due_at)dates.append(elt("div","", "Presentation: "+safeDate(item.presentation_at)));
   card.append(info,dates);fragment.append(card);
  }
  container.replaceChildren(fragment);
 };
 filter.addEventListener("change",render);
 dateFilter.addEventListener("change",render);
 render();
 text($("record-count"),String(reviewed.length));
 text($("candidate-count"),String(recs.length-reviewed.length));
 if(!reviewed.length)
   text($("data-status"),recs.length+" provisional assignment records from the original tracker and updated Canvas-supplied metadata are available. NONE have been checked against current official instructions for the shared hub. Do not treat them as authoritative.");
 else text($("data-status"),reviewed.length+" reviewed assignments and "+(recs.length-reviewed.length)+" provisional items. Confirm consequential dates in current Canvas/instructor instructions.");
}
function renderPrep(data){
 const container=$("prep-list"),filter=$("prep-course-filter"),dateFilter=$("prep-date-filter"),moduleFilter=$("prep-module-filter");
 const items=Array.isArray(data?.records)?data.records:[];
 const reviewed=items.filter(isReviewed).length;
 const today=todayChicago();
 const courses=[...new Set(items.map(r=>r.course_id).filter(Boolean))].sort();
 for(const course of courses){const option=elt("option","",course);option.value=course;filter.append(option);}
 const modules=[...new Set(items.map(r=>r.module).filter(Boolean))].sort((a,b)=>Number((a.match(/\d+/)||[])[0]||99)-Number((b.match(/\d+/)||[])[0]||99));
 for(const mod of modules){const option=elt("option","",mod);option.value=mod;moduleFilter.append(option);}
 const draw=()=>{
  const selected=filter.value,upcoming=dateFilter.value==="upcoming",mod=moduleFilter.value;
  const filtered=items.filter(r=>(selected==="all"||r.course_id===selected)&&(mod==="all"||r.module===mod)&&(!upcoming||!r.due_or_discuss_date||r.due_or_discuss_date>=today))
   .slice().sort((a,b)=>String(a.due_or_discuss_date||"9999").localeCompare(String(b.due_or_discuss_date||"9999"))||String(a.course_id).localeCompare(String(b.course_id)));
  if(!filtered.length){
   emptyMessage(container,"No matching readings or prep.",upcoming?"Try All dates to see the earlier modules, or choose another course. The official syllabus may list additional readings.":"No entries are recorded under these filters.");return;
  }
  const fragment=document.createDocumentFragment();
  for(const item of filtered){
   const card=elt("article","prep-card");
   const body=elt("div","prep-main");
   const badges=elt("div","prep-tags");
   badges.append(elt("span","pill "+(isReviewed(item)?"":"candidate"),isReviewed(item)?"Reviewed":"Provisional · verify"));
   if(item.required_status==="optional")badges.append(elt("span","pill unknown","Listed as optional"));
   if(item.required_status==="not_available_when_recorded")badges.append(elt("span","pill unknown","Awaiting source when recorded"));
   if(item.title_may_be_incomplete)badges.append(elt("span","pill unknown","Title may be shortened"));
   body.append(badges);
   body.append(elt("h3","",item.title||"Untitled prep item"));
   body.append(elt("p","prep-meta",[(item.course_id||"Course unknown"),item.module,item.prep_type?.replaceAll("_"," ")].filter(Boolean).join(" · ")));
   if(item.needed_for)body.append(elt("p","prep-purpose","Listed for: "+item.needed_for));
   if(typeof item.external_resource_url==="string" && /^https:\/\/(?:www\.)?(?:youtube\.com|mckinsey\.com|joshdp34\.github\.io)\//i.test(item.external_resource_url)){
    const link=elt("a","prep-link","Original public link (not rechecked) ↗");
    link.href=item.external_resource_url;link.target="_blank";link.rel="noopener noreferrer";body.append(link);
   }
   const details=elt("details","prep-source");
   details.append(elt("summary","","Source / verification"),
    elt("p","",item.source_reference||"Student-prepared Fall 2026 reading tracker. Verify with current course instructions."));
   body.append(details);
   const date=elt("div","prep-date");
   date.append(elt("strong","","Prep/discuss date"),elt("div","",safeDate(item.due_or_discuss_date)||"Not provided"));
   card.append(body,date);
   fragment.append(card);
  }
  container.replaceChildren(fragment);
 };
 filter.addEventListener("change",draw);
 dateFilter.addEventListener("change",draw);
 moduleFilter.addEventListener("change",draw);
 draw();
 text($("prep-count"),String(items.length-reviewed));
 text($("prep-status"),items.length+" reading and preparation items are listed, including QBA module lists. "+(items.length-reviewed)+" require cohort review. Module-only lists have no assigned due date; check Canvas.");
}

function renderProgramCalendar(data) {
 const dates=Array.isArray(data?.class_dates)?data.class_dates:[],
       sessions=Array.isArray(data?.fall_2026_sessions)?data.fall_2026_sessions:[],
       events=Array.isArray(data?.key_events)?data.key_events:[],
       payments=Array.isArray(data?.payment_dates)?data.payment_dates:[];
 const mode=$("schedule-date-filter"),today=todayChicago();
 const draw=()=>{
  const all=mode.value==="all";
  const available=dates.filter(d=>all||d.end_date>=today).slice().sort((a,b)=>a.start_date.localeCompare(b.start_date));
  const shown=all?available:available.slice(0,7);
  const list=$("program-date-list");
  if(!shown.length)emptyMessage(list,"No class dates in this view","Check the current official program calendar.");
  else list.replaceChildren(...shown.map((d,index)=>{
   const node=elt("article","program-card");
   node.append(elt("strong","",d.title),elt("div","program-date",safeDate(d.start_date)+(d.start_date!==d.end_date?" – "+safeDate(d.end_date):"")));
   if(d.note)node.append(elt("p","",d.note));
   const blocks=sessions.filter(x=>x.date>=d.start_date&&x.date<=d.end_date);
   if(blocks.length){
    const details=elt("details","program-sessions");if(!all&&index===0)details.open=true;
    details.append(elt("summary","","Fall 2026 course blocks"));
    for(const b of blocks){
     const weekday=new Date(b.date+"T12:00:00Z").getUTCDay()===5?"Fri":"Sat";
     const item=elt("div","program-session");
     item.append(elt("span","",weekday+" "+b.start_time+"–"+b.end_time),elt("strong","",b.display_course));
     details.append(item);
    }
    node.append(details);
   }
   return node;
  }));
  const combined=[...events.map(e=>({...e,date:e.start_date,detail:e.date_precision==="month_only"?e.display_date:safeDate(e.start_date)+(e.end_date&&e.end_date!==e.start_date?" – "+safeDate(e.end_date):"")})),
    ...payments.map(p=>({...p,date:p.due_date,detail:safeDate(p.due_date)}))]
    .filter(x=>all||(x.date>=today||(x.date_precision==="month_only"&&x.date.slice(0,7)===today.slice(0,7)))).sort((a,b)=>a.date.localeCompare(b.date));
  if(!combined.length)emptyMessage($("program-event-list"),"No events in this view","Check official program communications.");
  else $("program-event-list").replaceChildren(...combined.map(e=>{
   const el=elt("div","program-event");
   el.append(elt("strong","",e.title),elt("span","",e.detail));
   return el;
  }));
 };
 mode.addEventListener("change",draw);draw();
 text($("schedule-status"),dates.length+" class date blocks through March 2028, with Fall 2026 course sections, travel, milestones and payment dates. All are subject to change.");
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
function renderAiPolicies(data){
 const parent=$("ai-policy-list");
 const policies=Array.isArray(data?.policies)?data.policies:[];
 if(!policies.length){
  const note=elt("p","policy-empty","No assignment-specific AI rules have been captured. Consult your current instructor instructions before using AI for assessed work.");
  parent.replaceChildren(note);return;
 }
 const result=document.createDocumentFragment();
 for(const item of policies){
  const box=elt("article","policy-card");
  const tag=elt("span","policy-state",isReviewed(item)?"Source checked":"Provisional · not permission");
  box.append(tag,elt("h4","",item.title||"Assignment-specific AI policy"));
  const line=elt("p","",item.captured_guidance||"No specific AI-use guidance captured.");
  box.append(line);
  if(item.restricted_uses_captured?.length){
   box.append(elt("strong","policy-label","Restrictions in source summary"));
   const list=elt("ul","policy-points");
   for(const restriction of item.restricted_uses_captured)list.append(elt("li","",restriction));
   box.append(list);
  }
  if(item.disclosure_requirement_captured){
   box.append(elt("strong","policy-label","Disclosure noted in source"));
   box.append(elt("p","",item.disclosure_requirement_captured));
  }
  const details=elt("details","policy-provenance");
  details.append(elt("summary","","Source and verification limits"));
  details.append(elt("p","",item.source_reference||"Student-maintained class summary, not reverified."));
  if(item.open_questions)details.append(elt("p","",item.open_questions));
  box.append(details);
  result.append(box);
 }
 parent.replaceChildren(result);
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
 const [manifest,assignments,prep,program,resources,policies,changes,alerts]=await Promise.allSettled([
  loadFile("manifest.json"),loadFile("assignments.json"),loadFile("prep.json"),loadFile("program-calendar.json"),loadFile("resources.json"),loadFile("ai-policies.json"),loadFile("changes.json"),loadFile("open-alerts.json")
 ]);
 const has=m=>m.status==="fulfilled";
 if(has(manifest)){
  const info=manifest.value;
  text($("revision"),String(info.knowledge_revision??"Unknown"));
  text($("updated"),String(info.updated_at||"Not recorded"));
 }else{
  text($("revision"),"Unavailable");text($("updated"),"Could not verify current GitHub revision");
 }
 if(has(program))renderProgramCalendar(program.value);
 else {text($("schedule-status"),"Program calendar unavailable. Use official schedules.");emptyMessage($("program-date-list"),"Calendar unavailable","Verify dates in current Baylor materials.");emptyMessage($("program-event-list"),"Events unavailable","Check official dates.");}
 if(has(assignments))renderAssignments(assignments.value);
 else{text($("record-count"),"Unavailable");text($("candidate-count"),"Unavailable");text($("data-status"),"Live records could not be checked. Do not rely on this hub for deadlines.");emptyMessage($("assignment-list"),"Data temporarily unavailable","Confirm your assignments in official course systems.");}
 if(has(prep))renderPrep(prep.value);
 else{
  text($("prep-count"),"Unavailable");
  text($("prep-status"),"Reading and prep records could not be checked. Refer to the current course instructions.");
  emptyMessage($("prep-list"),"Reading list unavailable","Try again later; do not infer that no readings are assigned.");
 }
 if(has(resources))renderResources(resources.value);
 else emptyMessage($("resource-list"),"Resources temporarily unavailable","You can still browse the source repository using the links below.");
 renderAiPolicies(has(policies)?policies.value:{});
 renderChanges(has(changes)?changes.value:{},has(alerts)?alerts.value:{});
 if(!has(manifest)||!has(assignments)||!has(alerts))text($("data-status"),"Some public data could not be verified. Please check official course instructions.");
}
boot();
