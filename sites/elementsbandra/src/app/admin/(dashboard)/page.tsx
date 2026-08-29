"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type Recent = { id:string; firstName:string; lastName:string; mobile:string; email:string; status:string; createdAt:string; property?:{name:string}|null };

export default function AdminDashboard() {
  const [stats,setStats]=useState({inquiries:0,properties:0,newLeads:0,contacted:0});
  const [recent,setRecent]=useState<Recent[]>([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{ apiFetch("/api/admin/stats").then(r=>r.json()).then(d=>{if(d.ok){setStats(d.stats);setRecent(d.recent)}}).finally(()=>setLoading(false)); },[]);

  const cards=[
    {label:"Total Inquiries",value:stats.inquiries,href:"/admin/inquiries"},
    {label:"New Leads",value:stats.newLeads,href:"/admin/inquiries?status=new"},
    {label:"Contacted",value:stats.contacted,href:"/admin/inquiries?status=contacted"},
    {label:"Properties",value:stats.properties,href:"/admin/properties"},
  ];
  return <div>
    <h1 className="font-display text-3xl">Dashboard</h1>
    <p className="mt-1 text-sm text-slate-500">Inquire Now form data lands in PostgreSQL → managed here.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(c=><Link key={c.label} href={c.href} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-[var(--tide)]"><p className="text-xs uppercase tracking-wider text-slate-500">{c.label}</p><p className="mt-2 text-3xl font-semibold text-[var(--sea)]">{c.value}</p></Link>)}
    </div>
    <div className="mt-10 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between"><h2 className="font-semibold">Recent inquiries</h2><Link href="/admin/inquiries" className="text-sm text-[var(--tide)]">View all</Link></div>
      {loading ? <p className="mt-4 text-sm text-slate-500">Loading...</p> :
      <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="border-b text-xs uppercase text-slate-500"><tr><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">Contact</th><th className="py-2 pr-3">Project</th><th className="py-2 pr-3">Status</th><th className="py-2">When</th></tr></thead><tbody>
      {recent.map(r=><tr key={r.id} className="border-b border-slate-100"><td className="py-3 pr-3 font-medium">{r.firstName} {r.lastName}</td><td className="py-3 pr-3 text-slate-600">{r.mobile}<br/><span className="text-xs">{r.email}</span></td><td className="py-3 pr-3">{r.property?.name||"—"}</td><td className="py-3 pr-3"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize">{r.status}</span></td><td className="py-3 text-slate-500">{new Date(r.createdAt).toLocaleString()}</td></tr>)}
      </tbody></table></div>}
    </div>
  </div>;
}
