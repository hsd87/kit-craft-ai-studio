
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SponsorLogo {
  id?: string;
  name: string;
  logoUrl?: string;
  placement: string;
}

export interface PlayerInfo {
  id?: string;
  name: string;
  number: string;
}

export interface KitDesign {
  id?: string;
  clubName: string;
  region: string;
  primaryColor: string;
  secondaryColor: string;
  thirdColor: string;
  fourthColor: string;
  collarStyle: string;
  designStyle: string;
  sleevePattern: string;
  customPattern?: string;
  fabricType: string;
  makingType: string;
  teamLogoUrl?: string;
  kitType: string[];
  quantity: number;
  expressProd: boolean;
  deliveryRegion?: string;
  frontImageUrl?: string;
  backImageUrl?: string;
}

// Save kit design
export const saveKitDesign = async (
  kitDesign: KitDesign,
  sponsorLogos: SponsorLogo[],
  players: PlayerInfo[]
) => {
  try {
    // First, convert the design to match the database schema
    const kitDesignData = {
      club_name: kitDesign.clubName,
      region: kitDesign.region,
      primary_color: kitDesign.primaryColor,
      secondary_color: kitDesign.secondaryColor,
      third_color: kitDesign.thirdColor,
      fourth_color: kitDesign.fourthColor,
      collar_style: kitDesign.collarStyle,
      design_style: kitDesign.designStyle,
      sleeve_pattern: kitDesign.sleevePattern,
      custom_pattern: kitDesign.customPattern,
      fabric_type: kitDesign.fabricType,
      making_type: kitDesign.makingType,
      team_logo_url: kitDesign.teamLogoUrl,
      kit_type: kitDesign.kitType,
      quantity: kitDesign.quantity,
      express_prod: kitDesign.expressProd,
      delivery_region: kitDesign.deliveryRegion,
      front_image_url: kitDesign.frontImageUrl,
      back_image_url: kitDesign.backImageUrl
    };

    // Insert the kit design
    const { data: kitData, error: kitError } = await supabase
      .from('kit_designs')
      .insert([kitDesignData])
      .select('id')
      .single();

    if (kitError) throw kitError;
    
    const kitDesignId = kitData.id;

    // Insert sponsor logos if any
    if (sponsorLogos.length > 0) {
      const sponsorLogoData = sponsorLogos.map(logo => ({
        kit_design_id: kitDesignId,
        logo_url: logo.logoUrl || '',
        placement: logo.placement,
        sponsor_name: logo.name
      }));

      const { error: sponsorError } = await supabase
        .from('sponsor_logos')
        .insert(sponsorLogoData);

      if (sponsorError) throw sponsorError;
    }

    // Insert player details if any
    if (players.length > 0) {
      const playerData = players.map(player => ({
        kit_design_id: kitDesignId,
        player_name: player.name,
        player_number: player.number
      }));

      const { error: playerError } = await supabase
        .from('player_details')
        .insert(playerData);

      if (playerError) throw playerError;
    }

    return { id: kitDesignId };
  } catch (error: any) {
    console.error('Error saving kit design:', error);
    toast.error('Failed to save design: ' + error.message);
    throw error;
  }
};

// Get kit design by id
export const getKitDesignById = async (id: string) => {
  try {
    // Get kit design
    const { data: kitData, error: kitError } = await supabase
      .from('kit_designs')
      .select('*')
      .eq('id', id)
      .single();

    if (kitError) throw kitError;

    // Get sponsor logos
    const { data: sponsorData, error: sponsorError } = await supabase
      .from('sponsor_logos')
      .select('*')
      .eq('kit_design_id', id);

    if (sponsorError) throw sponsorError;

    // Get player details
    const { data: playerData, error: playerError } = await supabase
      .from('player_details')
      .select('*')
      .eq('kit_design_id', id);

    if (playerError) throw playerError;

    // Convert database schema to frontend model
    const kitDesign: KitDesign = {
      id: kitData.id,
      clubName: kitData.club_name,
      region: kitData.region,
      primaryColor: kitData.primary_color,
      secondaryColor: kitData.secondary_color,
      thirdColor: kitData.third_color,
      fourthColor: kitData.fourth_color,
      collarStyle: kitData.collar_style,
      designStyle: kitData.design_style,
      sleevePattern: kitData.sleeve_pattern,
      customPattern: kitData.custom_pattern,
      fabricType: kitData.fabric_type,
      makingType: kitData.making_type,
      teamLogoUrl: kitData.team_logo_url,
      kitType: kitData.kit_type,
      quantity: kitData.quantity,
      expressProd: kitData.express_prod,
      deliveryRegion: kitData.delivery_region,
      frontImageUrl: kitData.front_image_url,
      backImageUrl: kitData.back_image_url
    };

    const sponsorLogos: SponsorLogo[] = sponsorData.map(sponsor => ({
      id: sponsor.id,
      name: sponsor.sponsor_name || '',
      logoUrl: sponsor.logo_url,
      placement: sponsor.placement
    }));

    const players: PlayerInfo[] = playerData.map(player => ({
      id: player.id,
      name: player.player_name,
      number: player.player_number
    }));

    return { kitDesign, sponsorLogos, players };
  } catch (error: any) {
    console.error('Error fetching kit design:', error);
    toast.error('Failed to load design: ' + error.message);
    throw error;
  }
};

// Get list of kit designs for the user
export const getUserKitDesigns = async () => {
  try {
    const { data, error } = await supabase
      .from('kit_designs')
      .select('id, club_name, created_at, front_image_url')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error('Error fetching user kit designs:', error);
    toast.error('Failed to load designs: ' + error.message);
    throw error;
  }
};

// Create order
export const createOrder = async (kitDesignId: string, totalPrice: number, shippingAddress: any) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          kit_design_id: kitDesignId,
          total_price: totalPrice,
          shipping_address: shippingAddress
        }
      ])
      .select('id')
      .single();

    if (error) throw error;

    return { id: data.id };
  } catch (error: any) {
    console.error('Error creating order:', error);
    toast.error('Failed to create order: ' + error.message);
    throw error;
  }
};
