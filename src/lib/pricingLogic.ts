
export interface PricingOptions {
  basePrice?: number;
  quantity: number;
  collarStyle: string;
  designStyle: string;
  fabricType: string;
  makingType: string;
  sleevePattern: string;
  playerNames: boolean;
  playerNumbers: boolean;
  hasTeamLogo: boolean;
  sponsorCount: number;
}

export const calculatePrice = (options: PricingOptions): {total: number; unitPrice: number} => {
  // Base price for a single kit
  const basePrice = options.basePrice || 45;
  
  // Additional costs for different options
  const collarPrices: Record<string, number> = {
    'v-neck': 0,
    'crew-neck': 0,
    'collar': 5,
    'collar-without-buttons': 3
  };
  
  const fabricPrices: Record<string, number> = {
    'dry-fit-polyester': 0,
    'mesh-polyester': 3
  };
  
  const makingPrices: Record<string, number> = {
    'sublimation': 0,
    'cut-sew': 10
  };
  
  const sleevePrices: Record<string, number> = {
    'normal': 0,
    'raglan': 3,
    'unique': 5
  };
  
  // Calculate additions
  let additions = 0;
  
  // Add collar style price
  additions += collarPrices[options.collarStyle] || 0;
  
  // Add fabric type price
  additions += fabricPrices[options.fabricType] || 0;
  
  // Add making type price
  additions += makingPrices[options.makingType] || 0;
  
  // Add sleeve pattern price
  additions += sleevePrices[options.sleevePattern] || 0;
  
  // Add player names and numbers cost
  if (options.playerNames) additions += 5;
  if (options.playerNumbers) additions += 3;
  
  // Add logo costs
  if (options.hasTeamLogo) additions += 5;
  
  // Add sponsor logo costs
  additions += options.sponsorCount * 3;
  
  // Calculate unit price before quantity discount
  const unitPrice = basePrice + additions;
  
  // Apply bulk discounts
  let discountedUnitPrice = unitPrice;
  if (options.quantity >= 20) {
    discountedUnitPrice = unitPrice * 0.85; // 15% discount
  } else if (options.quantity >= 15) {
    discountedUnitPrice = unitPrice * 0.90; // 10% discount
  } else if (options.quantity >= 10) {
    discountedUnitPrice = unitPrice * 0.95; // 5% discount
  }
  
  // Calculate total price
  const total = discountedUnitPrice * options.quantity;
  
  return {
    unitPrice: parseFloat(discountedUnitPrice.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
};
