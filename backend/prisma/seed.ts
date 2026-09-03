
import "dotenv/config";
import {PrismaClient,Role} from "@prisma/client";
import bcrypt from "bcryptjs";
const db=new PrismaClient();

const sites=[
 {key:"elementsbandra",name:"Elements Bandra",domain:"http://localhost:3000"},
 {key:"bay-heights",name:"Bay Heights",domain:"http://localhost:3001"},
 {key:"aurelia-realty",name:"Aurelia Realty",domain:"http://localhost:3002"},
 {key:"meridian",name:"Meridian Realty",domain:"http://localhost:3003"},
 {key:"raheja",name:"RahejaSpaces",domain:"http://localhost:3004"},
];

async function main(){
 for(const s of sites) await db.site.upsert({where:{key:s.key},update:{name:s.name,domain:s.domain},create:s});
 const superHash=await bcrypt.hash(process.env.SEED_SUPER_ADMIN_PASSWORD||"SuperAdmin@12345",12);
 const adminHash=await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD||"Admin@12345",12);
 const sa=await db.user.upsert({where:{email:process.env.SEED_SUPER_ADMIN_EMAIL||"superadmin@crm.local"},update:{passwordHash:superHash,role:Role.SUPER_ADMIN},create:{name:"Global Super Admin",email:process.env.SEED_SUPER_ADMIN_EMAIL||"superadmin@crm.local",passwordHash:superHash,role:Role.SUPER_ADMIN}});
 const admin=await db.user.upsert({where:{email:"admin@elements.local"},update:{passwordHash:adminHash,role:Role.ADMIN},create:{name:"Elements Admin",email:"admin@elements.local",passwordHash:adminHash,role:Role.ADMIN}});
 const all=await db.site.findMany();
 await db.userSiteAccess.deleteMany({where:{userId:admin.id}});
 await db.userSiteAccess.createMany({data:[all[0]].map(s=>({userId:admin.id,siteId:s.id}))});
 await db.siteContent.upsert({where:{siteId_key:{siteId:all[0].id,key:"homepage"}},update:{},create:{siteId:all[0].id,key:"homepage",value:{heroTitle:"Premium spaces. Personal service.",heroSubtitle:"Managed through the unified CRM."}}});
 await db.globalContent.upsert({where:{key:"brand"} ,update:{},create:{key:"brand",value:{fontFamily:"Inter",primaryColor:"#183A37",secondaryColor:"#C7A86B"}}});
 console.log("Seeded sites:",all.map(s=>s.key).join(", "));
 console.log("Super admin:",sa.email);
 console.log("Site admin:",admin.email);
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>db.$disconnect());
