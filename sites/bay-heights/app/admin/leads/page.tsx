"use client";
import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
const API_URL=process.env.NEXT_PUBLIC_API_URL||"http://localhost:4000";
type Lead={id:string;name:string;phone:string;email:string|null;source:string;status:string;createdAt:string};
const statuses=["NEW","CONTACTED","QUALIFIED","SITE_VISIT","NEGOTIATION","WON","LOST"];
export default function LeadsPage(){
 const [leads,setLeads]=useState<Lead[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState("");const [busy,setBusy]=useState<string|null>(null);const router=useRouter();
 async function load(){try{const r=await fetch(`${API_URL}/api/admin/leads`,{credentials:"include",cache:"no-store"});if(r.status===401){router.replace("/admin");return;}if(!r.ok)throw new Error("Unable to load leads");const j=await r.json();setLeads(j.leads||[]);}catch(e){setError(e instanceof Error?e.message:"Unable to load leads");}finally{setLoading(false);}}
 useEffect(()=>{load()},[]);
 async function update(id:string,status:string){setBusy(id);setError("");try{const r=await fetch(`${API_URL}/api/admin/leads`,{method:"PATCH",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({id,status})});if(r.status===401){router.replace("/admin");return;}if(!r.ok)throw new Error("Unable to update lead");setLeads(xs=>xs.map(x=>x.id===id?{...x,status}:x));}catch(e){setError(e instanceof Error?e.message:"Update failed");}finally{setBusy(null);}}
 async function logout(){await fetch(`${API_URL}/api/admin/logout`,{method:"POST",credentials:"include"});router.replace("/admin");}
 return <main className="admin"><div className="admin-shell"><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
 <div><h1>Lead CRM</h1><p>{leads.length} enquiries</p></div><div style={{display:"flex",gap:8}}><a href="/" style={{padding:"10px 14px",background:"#111",color:"#fff",borderRadius:8}}>View website</a><button onClick={logout} style={{padding:"10px 14px",border:"1px solid #ddd",background:"#fff",borderRadius:8}}>Logout</button></div></div>
 <div className="admin-card">{error&&<p style={{color:"crimson"}}>{error}</p>}{loading?<p>Loading leads…</p>:<div style={{overflowX:"auto"}}><table><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Source</th><th>Status</th><th>Created</th></tr></thead><tbody>
 {leads.length===0?<tr><td colSpan={6}>No enquiries yet.</td></tr>:leads.map(l=><tr key={l.id}><td>{l.name}</td><td>{l.phone}</td><td>{l.email||"—"}</td><td>{l.source}</td><td><select disabled={busy===l.id} value={l.status} onChange={e=>update(l.id,e.target.value)} style={{padding:6,border:"1px solid #ddd",borderRadius:6}}>{statuses.map(s=><option key={s}>{s}</option>)}</select></td><td>{new Date(l.createdAt).toLocaleString("en-IN")}</td></tr>)}</tbody></table></div>}</div></div></main>;
}