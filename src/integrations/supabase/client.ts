
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Database types are defined in types.ts
// These are auto-generated from Supabase
export const supabase = createClient<Database>(
  'https://auuxixjweoolyegrbduh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1dXhpeGp3ZW9vbHllZ3JiZHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NzIyMTIsImV4cCI6MjA1OTU0ODIxMn0.PacOfqqwMeONDxeHBRVyRsgNNdJt6bEXW9p6BDn7tlk'
);
