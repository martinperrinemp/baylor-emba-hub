/** Pure backup helpers. No credentials in this public code. */
export function validateGitHubRepo(value) {
  if(typeof value !== "string" || !/^[\w.-]+\/[\w.-]+$/.test(value)) throw new Error("Invalid GitHub repository identifier");
  return value;
}
export function objectPrefix(timestamp, instanceId = "run") {
  const dt = new Date(timestamp);
  if(!Number.isFinite(dt.getTime())) throw new Error("Invalid backup timestamp");
  const clean=String(instanceId).replace(/[^a-zA-Z0-9-]/g,"").slice(0,80);
  return "daily/"+dt.toISOString().slice(0,10)+"/"+dt.toISOString().replaceAll(":","-")+"-"+(clean||"run");
}
export async function sha256Hex(bytes) {
  const sum=await crypto.subtle.digest("SHA-256",bytes);
  return Array.from(new Uint8Array(sum), b=>b.toString(16).padStart(2,"0")).join("");
}
export async function storeVerified(bucket,key,bytes,contentType) {
  if(!(bytes instanceof ArrayBuffer)) throw new Error("Expected binary ArrayBuffer");
  const limit=25*1024*1024;
  if(bytes.byteLength===0 || bytes.byteLength>limit) throw new Error("Backup object empty or exceeds MVP 25 MiB limit");
  const hash=await sha256Hex(bytes);
  await bucket.put(key,bytes,{httpMetadata:{contentType}});
  const saved=await bucket.get(key);
  if(!saved) throw new Error("Backup missing after write");
  const readBytes=await saved.arrayBuffer();
  if(readBytes.byteLength!==bytes.byteLength || await sha256Hex(readBytes)!==hash) throw new Error("Backup checksum verification failed");
  return {key,bytes:bytes.byteLength,sha256:hash};
}
export function requireExportToken(env) {
  const secret=env.D1_EXPORT_TOKEN;
  if(typeof secret!=="string" || secret.length<20) throw new Error("D1_EXPORT_TOKEN is not configured");
  return secret;
}
