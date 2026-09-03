
import "dotenv/config";
import express, {Request,Response,NextFunction} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import {SignJWT,jwtVerify} from "jose";
import {PrismaClient, Role, LeadStatus, LeadSource, Priority, Scope} from "@prisma/client";
import { google } from "googleapis";
import { z } from "zod";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth as getFirebaseAuth } from "firebase-admin/auth";

const db = new PrismaClient();
const app = express();
const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "CHANGE_ME_IN_PRODUCTION");
const COOKIE = "unified_crm_session";
const origins = (process.env.CORS_ORIGINS || "http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004").split(",").map(s=>s.trim()).filter(Boolean);
app.set("trust proxy", 1);

function firebaseAuth() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) return null;
  const firebaseApp = getApps()[0] || initializeApp({
    credential: cert({ projectId, clientEmail, privateKey })
  });
  return getFirebaseAuth(firebaseApp);
}

app.use(cors({origin:(origin,cb)=>!origin || origins.includes(origin) ? cb(null,true) : cb(new Error("CORS blocked")),credentials:true}));
app.use(express.json({limit:"3mb"}));
app.use(cookieParser());

const leadRate = new Map<string,{count:number;reset:number}>();
app.use("/api/leads",(req,res,next)=>{
  const key=String(req.ip||req.headers["x-forwarded-for"]||"unknown");
  const now=Date.now(); const current=leadRate.get(key);
  if(!current || now>current.reset){leadRate.set(key,{count:1,reset:now+60_000});return next();}
  current.count++;
  if(current.count>20)return res.status(429).json({ok:false,error:"Too many enquiries. Please try again later."});
  next();
});

type Session = {id:string,email:string,role:Role,name:string};
type AuthedRequest = Request & {session?:Session; site?:any};

function siteKey(req:Request){ return String(req.headers["x-site-key"] || req.query.site || "").trim().toLowerCase(); }
function routeParam(req:Request, name:string): string {
  const value = req.params[name];
  return Array.isArray(value) ? (value[0] ?? "") : value;
}
async function resolveSite(req:Request){
  const key=siteKey(req);
  if(key) return db.site.findUnique({where:{key}});
  const origin=String(req.headers.origin||"");
  if(origin) return db.site.findFirst({where:{domain:origin}});
  return null;
}
async function sessionFromUserId(id:string):Promise<Session|null>{
  const u=await db.user.findUnique({where:{id}});
  if(!u || !u.active) return null;
  return {id:u.id,email:u.email,role:u.role,name:u.name};
}

async function readCookieSession(req:Request):Promise<Session|null>{
  const token=req.cookies?.[COOKIE]; if(!token)return null;
  try{
    const payload=await jwtVerify(token,JWT_SECRET);
    return sessionFromUserId(String(payload.id || ""));
  }catch{return null}
}

async function readFirebaseSession(req:Request):Promise<Session|null>{
  const header=String(req.headers.authorization || "");
  if(!header.startsWith("Bearer ")) return null;
  const auth=firebaseAuth();
  if(!auth) return null;
  try{
    const decoded=await auth.verifyIdToken(header.slice(7));
    let u=await db.user.findUnique({where:{firebaseUid:decoded.uid}});
    if(!u && decoded.email){
      u=await db.user.findUnique({where:{email:decoded.email.toLowerCase()}});
      if(u) u=await db.user.update({where:{id:u.id},data:{firebaseUid:decoded.uid}});
    }
    if(!u || !u.active) return null;
    return {id:u.id,email:u.email,role:u.role,name:u.name};
  }catch{return null}
}

async function readSession(req:Request):Promise<Session|null>{
  return (await readFirebaseSession(req)) || (await readCookieSession(req));
}

async function issueLegacyCookie(res:Response, u:{id:string,email:string,role:Role,name:string}){
  const token=await new SignJWT({id:u.id,email:u.email,role:u.role,name:u.name})
    .setProtectedHeader({alg:"HS256"}).setIssuedAt()
    .setExpirationTime(process.env.SESSION_TTL||"8h").sign(JWT_SECRET);
  res.cookie(COOKIE,token,{
    httpOnly:true,
    sameSite:process.env.NODE_ENV==="production" ? "none" : "lax",
    secure:process.env.NODE_ENV==="production",
    path:"/",
    maxAge:8*60*60*1000
  });
}

async function requireAuth(req:AuthedRequest,res:Response,next:NextFunction){
  const s=await readSession(req); if(!s)return res.status(401).json({ok:false,error:"Unauthorized"});
  req.session=s; next();
}
function roleAtLeast(role:Role, allowed:Role[]){return allowed.includes(role)}
async function requireSite(req:AuthedRequest,res:Response,next:NextFunction){
  const s=await resolveSite(req); if(!s||!s.active)return res.status(400).json({ok:false,error:"Valid site key is required"});
  req.site=s; next();
}
async function requireSiteAccess(req:AuthedRequest,res:Response,next:NextFunction){
  const s=await resolveSite(req); if(!s||!s.active)return res.status(400).json({ok:false,error:"Valid site key is required"});
  req.site=s;
  if(req.session!.role===Role.SUPER_ADMIN){next();return}
  const access=await db.userSiteAccess.findUnique({where:{userId_siteId:{userId:req.session!.id,siteId:s.id}}});
  if(!access)return res.status(403).json({ok:false,error:"No access to this website"});
  next();
}
async function audit(req:AuthedRequest, action:string, entity:string, entityId?:string, metadata?:any, scope:Scope=Scope.SITE){
  await db.auditLog.create({data:{userId:req.session?.id,siteId:req.site?.id,scope,action,entity,entityId,metadata}});
}

app.get("/api/health",async(_req,res)=>{try{await db.$queryRaw`SELECT 1`;res.json({ok:true,service:"unified-real-estate-crm",database:"up"})}catch{res.status(503).json({ok:false,database:"down"})}});

app.post("/api/auth/login",async(req,res)=>{
  try{
    const b=z.object({email:z.string().email(),password:z.string().min(1)}).parse(req.body);
    const u=await db.user.findUnique({where:{email:b.email.toLowerCase()}});
    if(!u||!u.active||!(await bcrypt.compare(b.password,u.passwordHash)))return res.status(401).json({ok:false,error:"Invalid email or password"});
    await issueLegacyCookie(res,u);
    res.json({ok:true,user:{id:u.id,name:u.name,email:u.email,role:u.role}});
  }catch{res.status(400).json({ok:false,error:"Invalid login request"})}
});
app.post("/api/auth/firebase",async(req,res)=>{
  try{
    const b=z.object({idToken:z.string().min(20)}).parse(req.body);
    const auth=firebaseAuth();
    if(!auth) return res.status(503).json({ok:false,error:"Firebase Admin is not configured on the server"});
    const decoded=await auth.verifyIdToken(b.idToken);
    if(!decoded.email) return res.status(401).json({ok:false,error:"Firebase account has no email"});
    let u=await db.user.findUnique({where:{firebaseUid:decoded.uid}});
    if(!u) u=await db.user.findUnique({where:{email:decoded.email.toLowerCase()}});
    if(!u || !u.active) return res.status(403).json({ok:false,error:"User is not provisioned in CRM"});
    if(u.firebaseUid!==decoded.uid) u=await db.user.update({where:{id:u.id},data:{firebaseUid:decoded.uid}});
    await issueLegacyCookie(res,u);
    res.json({ok:true,user:{id:u.id,name:u.name,email:u.email,role:u.role},authProvider:"firebase"});
  }catch(e){
    console.error("Firebase auth failed",e);
    res.status(401).json({ok:false,error:"Invalid Firebase ID token"});
  }
});
app.post("/api/auth/logout",(req,res)=>{res.clearCookie(COOKIE,{httpOnly:true,sameSite:process.env.NODE_ENV==="production" ? "none" : "lax",secure:process.env.NODE_ENV==="production",path:"/"});res.json({ok:true})});
app.get("/api/auth/me",requireAuth,(req:AuthedRequest,res)=>res.json({ok:true,user:req.session}));

app.get("/api/sites",requireAuth,async(req:AuthedRequest,res)=>{
  const sites=req.session!.role===Role.SUPER_ADMIN
    ? await db.site.findMany({orderBy:{name:"asc"}})
    : await db.site.findMany({where:{access:{some:{userId:req.session!.id}}},orderBy:{name:"asc"}});
  res.json({ok:true,sites});
});
app.get("/api/sites/:key/public",async(req,res)=>{
  const s=await db.site.findUnique({where:{key:routeParam(req, "key")}});
  if(!s||!s.active)return res.status(404).json({ok:false,error:"Site not found"});
  const [content,blogs]=await Promise.all([
    db.siteContent.findMany({where:{siteId:s.id}}),
    db.blog.findMany({where:{published:true,OR:[{global:true},{siteId:s.id}]},orderBy:{createdAt:"desc"}})
  ]);
  const globals=await db.globalContent.findMany();
  res.json({ok:true,site:s,content:Object.fromEntries(content.map(x=>[x.key,x.value])),globalContent:Object.fromEntries(globals.map(x=>[x.key,x.value])),blogs});
});

const leadSchema=z.object({
  name:z.string().min(2).max(120), phone:z.string().min(7).max(40),
  email:z.string().email().optional().or(z.literal("")),
  message:z.string().max(5000).optional(), source:z.nativeEnum(LeadSource).optional(),
  priority:z.nativeEnum(Priority).optional(), propertyId:z.string().optional(), propertyName:z.string().max(300).optional()
});
app.post("/api/leads",requireSite,async(req:AuthedRequest,res)=>{
  try{
    const b=leadSchema.parse(req.body);
    const lead=await db.lead.create({data:{siteId:req.site.id,name:b.name,phone:b.phone,email:b.email||null,message:b.message||null,source:b.source||LeadSource.WEBSITE,priority:b.priority||Priority.MEDIUM,propertyId:b.propertyId||null,propertyName:b.propertyName||null}});
    const synced=await syncLeadToGoogleSheet(lead.id);
    res.status(201).json({ok:true,id:lead.id,googleSheetSynced:synced});
  }catch(e){console.error(e);res.status(400).json({ok:false,error:e instanceof z.ZodError?"Please enter valid enquiry details":"Unable to save enquiry"})}
});

app.get("/api/admin/dashboard",requireAuth,requireSiteAccess,async(req:AuthedRequest,res)=>{
  const siteId=req.site.id;
  const [total,newLeads,qualified,visits,won,lost]=await Promise.all([
    db.lead.count({where:{siteId}}),db.lead.count({where:{siteId,status:LeadStatus.NEW}}),db.lead.count({where:{siteId,status:LeadStatus.QUALIFIED}}),
    db.lead.count({where:{siteId,status:LeadStatus.SITE_VISIT}}),db.lead.count({where:{siteId,status:LeadStatus.WON}}),db.lead.count({where:{siteId,status:LeadStatus.LOST}})
  ]);
  res.json({ok:true,site:req.site,stats:{total,newLeads,qualified,visits,won,lost,conversionRate:total?Math.round(won/total*100):0}});
});

app.get("/api/admin/leads",requireAuth,requireSiteAccess,async(req:AuthedRequest,res)=>{
  const q=String(req.query.q||"").trim(); const status=String(req.query.status||"");
  const where:any={siteId:req.site.id};
  if(status && status!=="all")where.status=status;
  if(q)where.OR=[{name:{contains:q,mode:"insensitive"}},{email:{contains:q,mode:"insensitive"}},{phone:{contains:q}},{propertyName:{contains:q,mode:"insensitive"}}];
  const leads=await db.lead.findMany({where,include:{assignedTo:{select:{id:true,name:true,email:true}}},orderBy:{createdAt:"desc"}});
  res.json({ok:true,leads});
});
app.patch("/api/admin/leads/:id",requireAuth,requireSiteAccess,async(req:AuthedRequest,res)=>{
  const b=z.object({status:z.nativeEnum(LeadStatus).optional(),priority:z.nativeEnum(Priority).optional(),notes:z.string().max(5000).nullable().optional(),assignedToId:z.string().nullable().optional()}).parse(req.body);
  const existing=await db.lead.findFirst({where:{id:routeParam(req, "id"),siteId:req.site.id}}); if(!existing)return res.status(404).json({ok:false,error:"Lead not found"});
  const lead=await db.lead.update({where:{id:existing.id},data:b});
  await audit(req,"UPDATE","Lead",lead.id,b);
  res.json({ok:true,lead});
});

app.get("/api/admin/content",requireAuth,requireSiteAccess,async(req:AuthedRequest,res)=>{
  const rows=await db.siteContent.findMany({where:{siteId:req.site.id},orderBy:{key:"asc"}});
  res.json({ok:true,content:Object.fromEntries(rows.map(r=>[r.key,r.value]))});
});
app.put("/api/admin/content/:key",requireAuth,requireSiteAccess,async(req:AuthedRequest,res)=>{
  const row=await db.siteContent.upsert({where:{siteId_key:{siteId:req.site.id,key:routeParam(req, "key")}},update:{value:req.body.value,updatedById:req.session!.id},create:{siteId:req.site.id,key:routeParam(req, "key"),value:req.body.value,updatedById:req.session!.id}});
  await audit(req,"UPSERT","SiteContent",row.id,{key:routeParam(req, "key"),value:req.body.value});
  res.json({ok:true,row});
});

app.get("/api/admin/global-content",requireAuth,async(req:AuthedRequest,res)=>{
  if(!roleAtLeast(req.session!.role,[Role.SUPER_ADMIN,Role.CONTENT_MANAGER]))return res.status(403).json({ok:false,error:"Forbidden"});
  const rows=await db.globalContent.findMany({orderBy:{key:"asc"}});res.json({ok:true,content:Object.fromEntries(rows.map(r=>[r.key,r.value]))});
});
app.put("/api/admin/global-content/:key",requireAuth,async(req:AuthedRequest,res)=>{
  if(req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Super admin only"});
  const row=await db.globalContent.upsert({where:{key:routeParam(req, "key")},update:{value:req.body.value,updatedById:req.session!.id},create:{key:routeParam(req, "key"),value:req.body.value,updatedById:req.session!.id}});
  await audit(req,"UPSERT","GlobalContent",row.id,{key:routeParam(req, "key"),value:req.body.value},Scope.GLOBAL);res.json({ok:true,row});
});

app.get("/api/admin/blogs",requireAuth,async(req:AuthedRequest,res)=>{
  const where=req.session!.role===Role.SUPER_ADMIN?{}:{OR:[{global:false,siteId:req.site?.id},{global:true}]};
  res.json({ok:true,blogs:await db.blog.findMany({where,orderBy:{createdAt:"desc"}})});
});
const blogSchema=z.object({slug:z.string().min(2),title:z.string().min(2),excerpt:z.string().optional().nullable(),content:z.string().min(1),coverImage:z.string().optional().nullable(),published:z.boolean().optional(),global:z.boolean().optional(),siteId:z.string().optional().nullable()});
app.post("/api/admin/blogs",requireAuth,async(req:AuthedRequest,res)=>{
  if(req.session!.role!==Role.SUPER_ADMIN && !( [Role.ADMIN, Role.CONTENT_MANAGER] as Role[] ).includes(req.session!.role))return res.status(403).json({ok:false,error:"Forbidden"});
  const b=blogSchema.parse(req.body); if(b.global && req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Only super admin can publish global blogs"});
  const blog=await db.blog.create({data:{...b,siteId:b.global?null:(b.siteId||req.site?.id)}}); await audit(req,"CREATE","Blog",blog.id,{global:blog.global},blog.global?Scope.GLOBAL:Scope.SITE);res.status(201).json({ok:true,blog});
});
app.patch("/api/admin/blogs/:id",requireAuth,async(req:AuthedRequest,res)=>{
  const old=await db.blog.findUnique({where:{id:routeParam(req, "id")}});if(!old)return res.status(404).json({ok:false,error:"Blog not found"});
  if(old.global && req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Super admin only"});
  const blog=await db.blog.update({where:{id:old.id},data:blogSchema.partial().parse(req.body)});await audit(req,"UPDATE","Blog",blog.id,req.body,blog.global?Scope.GLOBAL:Scope.SITE);res.json({ok:true,blog});
});

app.get("/api/admin/users",requireAuth,async(req:AuthedRequest,res)=>{
  if(req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Super admin only"});
  const users=await db.user.findMany({select:{id:true,name:true,email:true,role:true,active:true,siteAccess:{select:{siteId:true,site:{select:{key:true,name:true}}}}},orderBy:{createdAt:"asc"}});res.json({ok:true,users});
});
app.post("/api/admin/users",requireAuth,async(req:AuthedRequest,res)=>{
  if(req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Super admin only"});
  const b=z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(8),role:z.nativeEnum(Role),siteKeys:z.array(z.string()).default([])}).parse(req.body);
  const hash=await bcrypt.hash(b.password,12);const sites=await db.site.findMany({where:{key:{in:b.siteKeys}}});
  const u=await db.user.create({data:{name:b.name,email:b.email.toLowerCase(),passwordHash:hash,role:b.role,siteAccess:{create:sites.map(s=>({siteId:s.id}))}}});await audit(req,"CREATE","User",u.id,{role:u.role},Scope.GLOBAL);res.status(201).json({ok:true,id:u.id});
});
app.patch("/api/admin/users/:id",requireAuth,async(req:AuthedRequest,res)=>{
  if(req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Super admin only"});
  const b=z.object({name:z.string().min(2).optional(),role:z.nativeEnum(Role).optional(),active:z.boolean().optional(),password:z.string().min(8).optional(),siteKeys:z.array(z.string()).optional()}).parse(req.body);
  const data:any={...b};delete data.siteKeys;if(b.password)data.passwordHash=await bcrypt.hash(b.password,12);delete data.password;
  const u=await db.user.update({where:{id:routeParam(req, "id")},data});
  if(b.siteKeys){const sites=await db.site.findMany({where:{key:{in:b.siteKeys}}});await db.userSiteAccess.deleteMany({where:{userId:u.id}});if(sites.length)await db.userSiteAccess.createMany({data:sites.map(s=>({userId:u.id,siteId:s.id}))});}
  await audit(req,"UPDATE","User",u.id,b,Scope.GLOBAL);res.json({ok:true});
});

app.put("/api/admin/sites/:key/theme",requireAuth,async(req:AuthedRequest,res)=>{
  if(req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Super admin only"});
  const s=await db.site.findUnique({where:{key:routeParam(req, "key")}});if(!s)return res.status(404).json({ok:false,error:"Site not found"});
  const b=z.object({primaryColor:z.string().optional(),secondaryColor:z.string().optional(),fontFamily:z.string().optional(),logoUrl:z.string().url().optional()}).parse(req.body);
  const updated=await db.site.update({where:{id:s.id},data:b});await audit(req,"UPDATE","SiteTheme",s.id,b,Scope.GLOBAL);res.json({ok:true,site:updated});
});

app.get("/api/admin/audit",requireAuth,async(req:AuthedRequest,res)=>{
  if(req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Super admin only"});
  res.json({ok:true,logs:await db.auditLog.findMany({include:{user:{select:{name:true,email:true}},site:{select:{name:true,key:true}}},orderBy:{createdAt:"desc"},take:200})});
});

async function googleSheetsClient(){
  const raw=process.env.GOOGLE_SERVICE_ACCOUNT_JSON; if(!raw)return null;
  try{
    const credentials=JSON.parse(raw);
    const auth=new google.auth.GoogleAuth({credentials,scopes:["https://www.googleapis.com/auth/spreadsheets"]});
    return google.sheets({version:"v4",auth});
  }catch(e){console.error("Google service account JSON invalid",e);return null}
}
async function syncLeadToGoogleSheet(leadId:string){
  const lead=await db.lead.findUnique({where:{id:leadId},include:{site:true}}); if(!lead)return false;
  const cfg=await db.googleSheetConfig.findUnique({where:{siteId:lead.siteId}}); if(!cfg?.enabled)return false;
  const sheets=await googleSheetsClient();if(!sheets)return false;
  try{
    await sheets.spreadsheets.values.append({spreadsheetId:cfg.spreadsheetId,range:`'${cfg.sheetName}'!A:K`,valueInputOption:"USER_ENTERED",requestBody:{values:[[lead.createdAt.toISOString(),lead.site.name,lead.name,lead.phone,lead.email||"",lead.message||"",lead.source,lead.status,lead.priority,lead.propertyName||"",lead.notes||""]]}});
    await db.lead.update({where:{id:lead.id},data:{googleSheetSyncedAt:new Date()}});return true;
  }catch(e){console.error("Google Sheets sync failed",e);return false}
}
app.post("/api/admin/sites/:key/google-sheet",requireAuth,async(req:AuthedRequest,res)=>{
  if(req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Super admin only"});
  const s=await db.site.findUnique({where:{key:routeParam(req, "key")}});if(!s)return res.status(404).json({ok:false,error:"Site not found"});
  const b=z.object({spreadsheetId:z.string().min(10),sheetName:z.string().default("Leads"),enabled:z.boolean().default(true)}).parse(req.body);
  const cfg=await db.googleSheetConfig.upsert({where:{siteId:s.id},update:b,create:{siteId:s.id,...b}});await audit(req,"UPDATE","GoogleSheetConfig",cfg.id,b,Scope.GLOBAL);res.json({ok:true,config:cfg});
});
app.post("/api/admin/sites/:key/google-sheet/test",requireAuth,async(req:AuthedRequest,res)=>{
  if(req.session!.role!==Role.SUPER_ADMIN)return res.status(403).json({ok:false,error:"Super admin only"});
  const s=await db.site.findUnique({where:{key:routeParam(req, "key")},include:{sheet:true}});if(!s?.sheet)return res.status(404).json({ok:false,error:"Sheet config missing"});
  const sheets=await googleSheetsClient();if(!sheets)return res.status(503).json({ok:false,error:"GOOGLE_SERVICE_ACCOUNT_JSON is not configured"});
  try{await sheets.spreadsheets.values.append({spreadsheetId:s.sheet.spreadsheetId,range:`'${s.sheet.sheetName}'!A:A`,valueInputOption:"USER_ENTERED",requestBody:{values:[[new Date().toISOString(),"TEST","Unified CRM connection test"]]}});res.json({ok:true})}
  catch(e){res.status(502).json({ok:false,error:"Google Sheets test failed"})}
});

app.use((err:any,_req:Request,res:Response,_next:NextFunction)=>{console.error(err);res.status(500).json({ok:false,error:"Internal server error"})});
app.listen(PORT,"0.0.0.0",()=>console.log(`Unified CRM backend listening on :${PORT}`));
process.on("SIGINT",async()=>{await db.$disconnect();process.exit(0)});
process.on("SIGTERM",async()=>{await db.$disconnect();process.exit(0)});
