import { z } from 'zod';

export const masterSchema = z.object({
  master_id: z.number({ coerce: true })
});

export const mastersSchema = z.object({
  page: z.number({ coerce: true }).optional().default(1),
  query: z.string().optional(),
  title: z.string().optional(),
  master_title: z.string().optional(),
  credit: z.string().optional(),
  artist: z.string().optional(),
  anv: z.string().optional(),
  label: z.string().optional(),
  genre: z.string().optional(),
  style: z.string().optional(),
  country: z.string().optional().default('canada'),
  year: z.string().optional().default('2024'),
  format: z.string().optional(),
  catno: z.string().optional(),
  barcode: z.string().optional(),
  track: z.string().optional(),
  submitter: z.string().optional(),
  contributor: z.string().optional()
});

export const favouriteSchema = z.object({
  username: z.string(),
  master_id: z.number({ coerce: true })
});

export const favouritesSchema = z.object({
  username: z.string()
});
