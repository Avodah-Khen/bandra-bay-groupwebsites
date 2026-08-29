import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const p=await prisma.project.findUnique({where:{slug},include:{units:true}});
  if(!p || !p.published) return notFound();
  return <main>
    <section className="hero" style={{backgroundImage:`linear-gradient(110deg,rgba(18,26,20,.92),rgba(18,26,20,.3)),url(${p.heroImage})`}}><div className="container"><div className="eyebrow">{p.category} · {p.status.replaceAll("_"," ")}</div><h1>{p.title}</h1><p>{p.location}, {p.city}, {p.state}</p></div></section>
    <section className="section"><div className="container split"><div><div className="eyebrow">Overview</div><h2>{p.shortDesc}</h2><p className="meta" style={{fontSize:17}}>{p.description}</p><p className="meta"><b>Configurations:</b> {p.bhk || "To be announced"}<br/><b>Area:</b> {p.areaFrom || "-"} to {p.areaTo || "-"} sq.ft<br/><b>Possession:</b> {p.possessionDate || "To be announced"}<br/><b>RERA:</b> {p.reraNumber || "To be announced"}</p></div><div className="form"><h3>Interested in this project?</h3><p className="meta">Submit your details and the CRM will create a lead automatically.</p><form action="/api/leads" method="post"><input type="hidden" name="projectId" value={p.id}/><input type="hidden" name="source" value="WEBSITE"/><div className="field"><label>Name *</label><input name="name" required/></div><div className="field"><label>Phone *</label><input name="phone" required/></div><div className="field"><label>Email</label><input name="email" type="email"/></div><div className="field"><label>Message</label><textarea name="message"/></div><button className="btn" type="submit">Submit enquiry</button></form></div></div></section>
    <section className="section"><div className="container"><div className="eyebrow">Inventory</div><h2>Available units</h2><div className="tablewrap"><table><thead><tr><th>Type</th><th>Area</th><th>Floor</th><th>Price</th><th>Status</th></tr></thead><tbody>{p.units.map(u=><tr key={u.id}><td>{u.unitType}</td><td>{u.carpetArea||"-"}</td><td>{u.floor||"-"}</td><td>{u.price?`₹${u.price.toLocaleString("en-IN")}`:"On request"}</td><td><span className="badge">{u.status}</span></td></tr>)}</tbody></table></div></div></section>
  </main>
}
