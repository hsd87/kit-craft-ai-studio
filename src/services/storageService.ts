
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const uploadTeamLogo = async (file: File, userId?: string) => {
  try {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId || 'anonymous'}/team-logo-${uuidv4()}.${fileExt}`;
    const filePath = `team-logos/${fileName}`;

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('kit_images')
      .upload(filePath, file);

    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('kit_images')
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading team logo:', error);
    throw error;
  }
};

export const uploadSponsorLogo = async (file: File, userId?: string) => {
  try {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId || 'anonymous'}/sponsor-logo-${uuidv4()}.${fileExt}`;
    const filePath = `sponsor-logos/${fileName}`;

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('kit_images')
      .upload(filePath, file);

    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('kit_images')
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading sponsor logo:', error);
    throw error;
  }
};

export const storeGeneratedImage = async (imageUrl: string, kitId: string, view: 'front' | 'back') => {
  try {
    // First, fetch the image as blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // Prepare for upload
    const fileName = `${kitId}/${view}-view.png`;
    const filePath = `generated-kits/${fileName}`;
    
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('kit_images')
      .upload(filePath, blob);
      
    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('kit_images')
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error(`Error storing ${view} view image:`, error);
    throw error;
  }
};
