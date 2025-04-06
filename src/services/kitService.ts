
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { KitDesign, PlayerInfo, SponsorLogo } from '@/components/KitDesigner/types';

/**
 * Saves a kit design to the database
 * @param kitDesign The kit design to save
 * @param sponsorLogos Array of sponsor logos
 * @param players Array of players
 * @returns The id of the saved kit design
 */
export const saveKitDesign = async (
  kitDesign: KitDesign,
  sponsorLogos: SponsorLogo[] = [],
  players: PlayerInfo[] = []
) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Save kit design
    const { data: kitData, error: kitError } = await supabase
      .from('kit_designs')
      .insert([
        {
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
          back_image_url: kitDesign.backImageUrl,
          user_id: user.id
        }
      ])
      .select()
      .single();
    
    if (kitError) {
      throw kitError;
    }
    
    if (!kitData) {
      throw new Error('Failed to save kit design');
    }
    
    // Save sponsor logos
    if (sponsorLogos.length > 0) {
      const { error: sponsorError } = await supabase
        .from('sponsor_logos')
        .insert(
          sponsorLogos.map(sponsor => ({
            kit_design_id: kitData.id,
            logo_url: sponsor.logoUrl || '',
            placement: sponsor.placement,
            sponsor_name: sponsor.name
          }))
        );
      
      if (sponsorError) {
        console.error('Error saving sponsor logos:', sponsorError);
      }
    }
    
    // Save player details
    if (players.length > 0) {
      const { error: playerError } = await supabase
        .from('player_details')
        .insert(
          players.map(player => ({
            kit_design_id: kitData.id,
            player_name: player.name,
            player_number: player.number,
            player_size: player.size || 'M'
          }))
        );
      
      if (playerError) {
        console.error('Error saving player details:', playerError);
      }
    }
    
    return kitData.id;
  } catch (error) {
    console.error('Error in saveKitDesign:', error);
    throw error;
  }
};

/**
 * Gets a kit design by id
 * @param id Kit design id
 * @returns The kit design with sponsor logos and players
 */
export const getKitDesignById = async (id: string) => {
  try {
    // Get kit design
    const { data: kitData, error: kitError } = await supabase
      .from('kit_designs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (kitError) {
      throw kitError;
    }
    
    // Get sponsor logos
    const { data: sponsorData, error: sponsorError } = await supabase
      .from('sponsor_logos')
      .select('*')
      .eq('kit_design_id', id);
    
    if (sponsorError) {
      console.error('Error fetching sponsor logos:', sponsorError);
    }
    
    // Get player details
    const { data: playerData, error: playerError } = await supabase
      .from('player_details')
      .select('*')
      .eq('kit_design_id', id);
    
    if (playerError) {
      console.error('Error fetching player details:', playerError);
    }
    
    // Build complete kit design object
    const design: KitDesign = {
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
      customPattern: kitData.custom_pattern || '',
      fabricType: kitData.fabric_type,
      makingType: kitData.making_type,
      teamLogoUrl: kitData.team_logo_url || '',
      kitType: kitData.kit_type,
      quantity: kitData.quantity,
      expressProd: kitData.express_prod,
      deliveryRegion: kitData.delivery_region || '',
      frontImageUrl: kitData.front_image_url || '',
      backImageUrl: kitData.back_image_url || '',
    };
    
    // Build sponsor logos
    const sponsors: SponsorLogo[] = sponsorData ? sponsorData.map((sponsor: any) => ({
      id: sponsor.id,
      name: sponsor.sponsor_name || '',
      logoUrl: sponsor.logo_url || '',
      placement: sponsor.placement,
    })) : [];
    
    // Build player details
    const players: PlayerInfo[] = playerData ? playerData.map((player: any) => ({
      id: player.id,
      name: player.player_name,
      number: player.player_number,
      size: player.player_size || 'M',
    })) : [];
    
    return { design, sponsors, players };
  } catch (error) {
    console.error('Error in getKitDesignById:', error);
    throw error;
  }
};

/**
 * Gets all kit designs for the current user
 * @returns Array of kit designs
 */
export const getUserKitDesigns = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('kit_designs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getUserKitDesigns:', error);
    throw error;
  }
};

/**
 * Places an order for a kit design
 * @param kitDesignId Kit design id
 * @param totalPrice Total price
 * @param shippingAddress Shipping address
 * @returns The id of the created order
 */
export const placeOrder = async (
  kitDesignId: string,
  totalPrice: number,
  shippingAddress: any
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          kit_design_id: kitDesignId,
          total_price: totalPrice,
          shipping_address: shippingAddress,
          user_id: user.id
        }
      ])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data.id;
  } catch (error) {
    console.error('Error in placeOrder:', error);
    throw error;
  }
};
