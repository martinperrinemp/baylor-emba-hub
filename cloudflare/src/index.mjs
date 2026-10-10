/** Proposal-only intake for MCP-capable assistants and REST/Action clients. */
import {McpServer} from "@modelcontextprotocol/server";
import {createMcpHandler} from "agents/mcp/server";
import {z} from "zod";
import {submitProposal,getProposalStatus} from "./queue.mjs";
import {safeProblem} from "./core.mjs";
import openapi from "../openapi.json";

const CATEGORIES=["assignment_date","assignment_requirement","ai_policy","resource","lesson"];
const SOURCES=["instructor_announcement","syllabus","canvas_manually_checked","student_report","other_unknown"];
function authorized(request,env) {
 const token=env.SUBMISSION_TOKEN;
 return typeof token==="string" && token.length>=32 && request.headers.get("Authorization")==="Bearer "+token;
}
async function accept(request,env) {
 const len=Number(request.headers.get("content-length")||"0");
 if(len>4096) return safeProblem("Request body too large",413);
 const body=await request.text();
 if(body.length>4096) return safeProblem("Request body too large",413);
 let proposal;
 try{proposal=JSON.parse(body)}catch{return safeProblem("Invalid JSON")}
 try{
  const result=await submitProposal(env,request,proposal);
  return Response.json(result,{status:result.http_status,headers:{"Cache-Control":"no-store"}});
 }catch(e){
  const message=e instanceof Error?e.message:"Invalid proposal";
  if(message.includes("configured")||message.includes("binding")) return safeProblem("Intake service is not configured",503);
  return safeProblem(message);
 }
}
function makeServer(env,request) {
 const server=new McpServer({name:"baylor-emba-hub",version:"0.1.0"});
 server.registerTool("submit_cohort_proposal",{
  description:"Submit an UNVERIFIED cohort change. Never changes approved data. Ask the student to clarify presentation vs submission date. Only submit when the student requests it.",
  inputSchema:{
    category:z.enum(CATEGORIES), target_id:z.string().min(3).max(96),
    field:z.string().min(2).max(80),proposed_value:z.string().min(1).max(600),
    source_type:z.enum(SOURCES),source_note:z.string().max(400).optional(),
    current_value:z.string().max(600).optional(),client_request_id:z.string().min(8).max(100).optional()
  }
 },async args=>{
  try{
   const result=await submitProposal(env,request,args);
   return {content:[{type:"text",text:JSON.stringify(result)}],isError:!result.ok};
  }catch(e){return {content:[{type:"text",text:String(e instanceof Error?e.message:"Could not submit")}],isError:true}}
 });
 server.registerTool("get_cohort_proposal_status",{
  description:"Retrieve the status of an already-submitted proposed correction by its returned proposal ID.",
  inputSchema:{proposal_id:z.string().uuid()}
 },async ({proposal_id})=>{
  const result=await getProposalStatus(env,proposal_id);
  return {content:[{type:"text",text:JSON.stringify(result)}],isError:!result.ok};
 });
 return server;
}
export default {
 async fetch(request,env,ctx) {
  const url=new URL(request.url);
  if(request.method==="GET"&&url.pathname==="/health")
   return Response.json({service:"baylor-emba-proposal-intake",status:"online",approved_records_edited:false});
  if(request.method==="GET"&&url.pathname==="/openapi.json")
   return Response.json({...openapi,servers:[{url:url.origin}]});
  if(!["/mcp","/api/proposals"].includes(url.pathname)&&!/^\/api\/proposals\/[a-f0-9-]{36}$/i.test(url.pathname))
   return safeProblem("Route not found",404);
  if(!authorized(request,env)) return safeProblem("Valid submission connector token required",401);
  if(url.pathname==="/mcp")
   return createMcpHandler(()=>makeServer(env,request),{route:"/mcp"})(request,env,ctx);
  if(url.pathname==="/api/proposals"&&request.method==="POST") return accept(request,env);
  if(url.pathname.startsWith("/api/proposals/")&&request.method==="GET") {
   const result=await getProposalStatus(env,url.pathname.split("/").at(-1));
   return Response.json(result,{status:result.http_status??200,headers:{"Cache-Control":"no-store"}});
  }
  return safeProblem("Method not allowed",405);
 }
};
