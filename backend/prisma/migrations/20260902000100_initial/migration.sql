-- Initial schema for Unified Real Estate CRM
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'SALES_AGENT', 'CONTENT_MANAGER');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT', 'NEGOTIATION', 'WON', 'LOST');
CREATE TYPE "LeadSource" AS ENUM ('WEBSITE', 'GOOGLE', 'META', 'WHATSAPP', 'PHONE', 'REFERRAL', 'WALK_IN', 'OTHER');
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE "Scope" AS ENUM ('SITE', 'GLOBAL');

CREATE TABLE "Site" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "domain" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "logoUrl" TEXT,
  "primaryColor" TEXT,
  "secondaryColor" TEXT,
  "fontFamily" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Site_key_key" ON "Site"("key");

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "firebaseUid" TEXT,
  "passwordHash" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'SALES_AGENT',
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");

CREATE TABLE "UserSiteAccess" (
  "userId" TEXT NOT NULL,
  "siteId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserSiteAccess_pkey" PRIMARY KEY ("userId", "siteId")
);

CREATE TABLE "Lead" (
  "id" TEXT NOT NULL,
  "siteId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT NOT NULL,
  "message" TEXT,
  "source" "LeadSource" NOT NULL DEFAULT 'WEBSITE',
  "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
  "notes" TEXT,
  "propertyId" TEXT,
  "propertyName" TEXT,
  "assignedToId" TEXT,
  "googleSheetSyncedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Lead_siteId_createdAt_idx" ON "Lead"("siteId", "createdAt");
CREATE INDEX "Lead_siteId_status_idx" ON "Lead"("siteId", "status");
CREATE INDEX "Lead_phone_idx" ON "Lead"("phone");
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

CREATE TABLE "SiteContent" (
  "id" TEXT NOT NULL,
  "siteId" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" JSONB NOT NULL,
  "updatedById" TEXT,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "SiteContent_siteId_key_key" ON "SiteContent"("siteId", "key");

CREATE TABLE "GlobalContent" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" JSONB NOT NULL,
  "updatedById" TEXT,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "GlobalContent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "GlobalContent_key_key" ON "GlobalContent"("key");

CREATE TABLE "Blog" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT,
  "content" TEXT NOT NULL,
  "coverImage" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "global" BOOLEAN NOT NULL DEFAULT true,
  "siteId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");
CREATE INDEX "Blog_published_global_idx" ON "Blog"("published", "global");

CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "siteId" TEXT,
  "scope" "Scope" NOT NULL,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entityId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
CREATE INDEX "AuditLog_siteId_createdAt_idx" ON "AuditLog"("siteId", "createdAt");

CREATE TABLE "GoogleSheetConfig" (
  "id" TEXT NOT NULL,
  "siteId" TEXT NOT NULL,
  "spreadsheetId" TEXT NOT NULL,
  "sheetName" TEXT NOT NULL DEFAULT 'Leads',
  "enabled" BOOLEAN NOT NULL DEFAULT true,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "GoogleSheetConfig_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "GoogleSheetConfig_siteId_key" ON "GoogleSheetConfig"("siteId");

ALTER TABLE "UserSiteAccess" ADD CONSTRAINT "UserSiteAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UserSiteAccess" ADD CONSTRAINT "UserSiteAccess_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SiteContent" ADD CONSTRAINT "SiteContent_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GlobalContent" ADD CONSTRAINT "GlobalContent_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SiteContent" ADD CONSTRAINT "SiteContent_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "GoogleSheetConfig" ADD CONSTRAINT "GoogleSheetConfig_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
