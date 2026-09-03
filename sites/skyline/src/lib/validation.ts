import { z } from 'zod';

const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(120),
  phone: z.string().trim().regex(phoneRegex, 'Enter a valid phone number'),
  email: z.string().trim().email('Enter a valid email').optional().or(z.literal('')),
  configurationId: z.string().optional().or(z.literal('')),
  budget: z.string().max(60).optional().or(z.literal('')),
  message: z.string().max(1000).optional().or(z.literal('')),
  preferredContactTime: z.string().max(60).optional().or(z.literal('')),
  consent: z.union([z.boolean(), z.string()]).refine((v) => v === true || v === 'true' || v === 'on', {
    message: 'Consent is required',
  }),
  source: z.string().default('WEBSITE'),
  medium: z.string().optional().or(z.literal('')),
  campaign: z.string().optional().or(z.literal('')),
  term: z.string().optional().or(z.literal('')),
  content: z.string().optional().or(z.literal('')),
  landingPage: z.string().optional().or(z.literal('')),
  referrer: z.string().optional().or(z.literal('')),
  device: z.string().optional().or(z.literal('')),
  formType: z.enum(['ENQUIRY', 'CALLBACK', 'BROCHURE', 'EMI', 'SITE_VISIT']).default('ENQUIRY'),
});

export const leadStatusSchema = z.enum([
  'NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT_SCHEDULED', 'SITE_VISIT_COMPLETED',
  'NEGOTIATION', 'BOOKING_PENDING', 'WON', 'LOST',
]);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const configurationSchema = z.object({
  type: z.string().min(2),
  carpetAreaSqft: z.coerce.number().positive(),
  price: z.coerce.number().optional().nullable(),
  startingPrice: z.coerce.number().optional().nullable(),
  floorPlanUrl: z.string().optional().nullable(),
  availability: z.string().default('AVAILABLE'),
  active: z.coerce.boolean().default(true),
});

export const amenitySchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
});

export const featureSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  icon: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
});

export const galleryItemSchema = z.object({
  url: z.string().min(3),
  type: z.enum(['IMAGE', 'VIDEO']).default('IMAGE'),
  category: z.enum(['EXTERIOR', 'INTERIOR', 'AMENITY', 'FLOOR_PLAN', 'LOCATION']),
  alt: z.string().optional().nullable(),
});

export const locationPointSchema = z.object({
  name: z.string().min(2),
  category: z.enum(['SCHOOL', 'HOSPITAL', 'BUSINESS', 'SHOPPING', 'TRANSPORT', 'AIRPORT', 'METRO', 'BEACH']),
  distanceKm: z.coerce.number().optional().nullable(),
  travelTimeMin: z.coerce.number().int().optional().nullable(),
  description: z.string().optional().nullable(),
});

export const faqSchema = z.object({
  question: z.string().min(3),
  answer: z.string().min(3),
  category: z.string().default('General'),
});

export const analyticsEventSchema = z.object({
  event: z.string().min(2).max(60),
  sessionId: z.string().optional(),
  projectId: z.string().optional(),
  source: z.string().optional(),
  campaign: z.string().optional(),
  device: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});
