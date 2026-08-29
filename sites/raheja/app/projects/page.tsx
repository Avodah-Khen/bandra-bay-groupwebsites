import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default async function Projects({searchParams}:{searchParams:Promise<{category?:string}>}) {
  const q=await searchParams; const category=q.category as any;
  const projects=await prisma.project.findMany({where:{published:true,...(category?{category}:{})},orderBy:{createdAt:"desc"}});
  return <main className="section"><div className="container"><div className="eyebrow">Portfolio</div><h2>Projects</h2>
    <div className="filters"><Link className={!category?"active":""} href="/projects">All</Link><Link className={category==="RESIDENTIAL"?"active":""} href="/projects?category=RESIDENTIAL">Residential</Link><Link className={category==="COMMERCIAL"?"active":""} href="/projects?category=COMMERCIAL">Commercial</Link><Link className={category==="INDUSTRIAL"?"active":""} href="/projects?category=INDUSTRIAL">Industrial</Link></div>
    <div className="grid">{projects.map(p=><Link className="card" href={`/projects/${p.slug}`} key={p.id}><div className="cardimg" style={{backgroundImage:`url(${p.heroImage})`}}/><div className="cardbody"><span className="eyebrow">{p.category}</span><h3>{p.title}</h3><p className="meta">{p.location}, {p.city}<br/>{p.shortDesc}</p></div></Link>)}</div>
  </div></main>
}
