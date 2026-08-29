import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const projects = await prisma.project.findMany({ where:{ published:true, featured:true }, take:4, orderBy:{createdAt:"desc"} });
  return <>
    <section className="hero"><div className="container">
      <div className="eyebrow">RAHEJASPACES · REAL ESTATE</div>
      <h1>Spaces designed for the way cities evolve.</h1>
      <p>Discover considered residences, workplaces and industrial destinations across Mumbai and Navi Mumbai.</p>
      <Link className="btn" href="/projects">Explore projects</Link>
    </div></section>
    <section className="section"><div className="container">
      <div className="eyebrow">Selected developments</div><h2>Current projects</h2>
      <div className="grid">{projects.map(p=><Link className="card" href={`/projects/${p.slug}`} key={p.id}>
        <div className="cardimg" style={{backgroundImage:`url(${p.heroImage})`}}/><div className="cardbody"><span className="eyebrow">{p.category}</span><h3>{p.title}</h3><div className="meta">{p.location}, {p.city}<br/>{p.status.replaceAll("_"," ")}</div></div>
      </Link>)}</div>
    </div></section>
    <section className="section dark"><div className="container split"><div><div className="eyebrow">Built around people</div><h2>From first enquiry to final decision.</h2><p style={{lineHeight:1.8,color:"#cfd5cf"}}>RahejaSpaces connects the public website to a real CRM. Every enquiry is validated, stored, associated with a project and surfaced to authorised administrators for follow-up.</p></div><Link className="btn light" style={{color:"#fff",borderColor:"#fff"}} href="/contact">Start a conversation</Link></div></section>
  </>;
}
