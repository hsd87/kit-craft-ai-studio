
-- Add player_size column to player_details table
ALTER TABLE public.player_details ADD COLUMN IF NOT EXISTS player_size TEXT;
