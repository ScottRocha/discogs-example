import { z } from 'zod';

import {
  masterSchema,
  mastersSchema,
  favouriteSchema,
  favouritesSchema
} from '@/schemas';

export type MasterSchema = z.infer<typeof masterSchema>;
export type MastersSchema = z.infer<typeof mastersSchema>;
export type FavouriteSchema = z.infer<typeof favouriteSchema>;
export type FavouritesSchema = z.infer<typeof favouritesSchema>;

export type Master = {
  country: string;
  year: string;
  format: string[];
  label: string[];
  type: string;
  genre: string[];
  style: string[];
  id: number;
  barcode: string[];
  master_id: number;
  master_url: string;
  uri: string;
  catno: string;
  title: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
  community: MasterCommunity;
  format_quantity: number;
  formats: MasterFormat[];
};

export type MasterCommunity = {
  want: number;
  have: number;
};

export type MasterFormat = {
  name: string;
  qty: string;
  descriptions: string[];
};
