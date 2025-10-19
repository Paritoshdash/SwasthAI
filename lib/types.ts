// lib/types.ts
import type { Doctor as BaseDoctor } from './mock-data';

export interface EnrichedDoctor extends BaseDoctor {
  isOnline?: boolean;
  phone?: string;
  hospital?: string;
}