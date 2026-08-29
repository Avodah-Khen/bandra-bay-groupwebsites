"use client";
import {FormEvent,useState} from "react";
import {useRouter} from "next/navigation";
const API_URL=process.env.NEXT_PUBLIC_API_URL||"http://localhost:4000";
export default function AdminPage(){
 const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const router=useRouter();
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");
  const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  try{const r=await fetch(`${API_URL}/api/admin/login`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(data)});
   if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(j.error||"Invalid email or password");}
   router.push("/admin/leads");
  }catch(err){setError(err instanceof Error?err.message:"Login failed");}finally{setBusy(false);}
 }
 return <main className="admin"><div className="admin-shell" style={{maxWidth:480}}><div className="admin-card">
 <h1>Bay Heights CRM</h1><p>Admin login</p><form onSubmit={submit}>
 <input style={{width:"100%",padding:12,marginBottom:12}} name="email" type="email" placeholder="Admin email" required/>
 <input style={{width:"100%",padding:12,marginBottom:12}} name="password" type="password" placeholder="Password" required/>
 <button style={{width:"100%",padding:12}} type="submit" disabled={busy}>{busy?"Signing in…":"Login"}</button></form>
 {error&&<p style={{color:"crimson"}}>{error}</p>}<p style={{marginTop:16,fontSize:13}}>Backend: {API_URL}</p>
 </div></div></main>;
}