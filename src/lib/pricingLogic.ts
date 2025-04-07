
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
  includeShorts: boolean;
  includeSocks: boolean;
  aiEnhanced: boolean;
}

export const calculatePrice = (options: PricingOptions): {total: number; unitPrice: number} => {
  // Base pricing
  const base = {
    jersey: 30,
    shorts: 15,
    socks: 8,
    logo: 5, // per logo
    ai: 5,
    nameAndNumber: 2,
  };
  
  // Start with jersey price
  let additions = 0;
  
  // Add shorts and socks if included
  if (options.includeShorts) {
    additions += base.shorts;
  }
  
  if (options.includeSocks) {
    additions += base.socks;
  }
  
  // Add player names and numbers cost
  const nameAndNumber = options.playerNames || options.playerNumbers;
  if (nameAndNumber) {
    additions += base.nameAndNumber;
  }
  
  // Add logo costs
  additions += options.hasTeamLogo ? base.logo : 0;
  additions += options.sponsorCount * base.logo;
  
  // Add AI enhancement cost
  if (options.aiEnhanced) {
    additions += base.ai;
  }
  
  // Additional style costs from existing pricing
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
  
  // Add collar style price
  additions += collarPrices[options.collarStyle] || 0;
  
  // Add fabric type price
  additions += fabricPrices[options.fabricType] || 0;
  
  // Add making type price
  additions += makingPrices[options.makingType] || 0;
  
  // Add sleeve pattern price
  additions += sleevePrices[options.sleevePattern] || 0;
  
  // Calculate unit price
  const unitPrice = base.jersey + additions;
  
  // Apply bulk discounts
  let discountedUnitPrice = unitPrice;
  if (options.quantity >= 20) {
    discountedUnitPrice = unitPrice * 0.85; // 15% discount
  } else if (options.quantity >= 10) {
    discountedUnitPrice = unitPrice * 0.90; // 10% discount
  }
  
  // Calculate total price
  const total = discountedUnitPrice * options.quantity;
  
  return {
    unitPrice: parseFloat(discountedUnitPrice.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
};
