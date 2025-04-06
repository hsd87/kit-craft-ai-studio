
export interface PlayerInfo {
  id: string;
  name: string;
  number: string;
  size?: string;
}

export interface SponsorLogo {
  id: string;
  name: string;
  logoUrl?: string;
  placement: string;
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
  customPattern: string;
  fabricType: string;
  makingType: string;
  teamLogoUrl: string;
  kitType: string[];
  quantity: number;
  expressProd: boolean;
  deliveryRegion: string;
  frontImageUrl?: string;
  backImageUrl?: string;
}

export interface DesignerFormProps {
  onDesignChange: (design: KitDesign) => void;
  onGenerateRequest: () => void;
  onSponsorLogosChange?: (sponsorLogos: SponsorLogo[]) => void;
  onPlayersChange?: (players: PlayerInfo[]) => void;
}

export interface PricingCalculatorProps {
  collarStyle: string;
  designStyle: string;
  fabricType: string;
  makingType: string;
  sleevePattern: string;
  hasTeamLogo: boolean;
  sponsorCount: number;
  onQuantityChange: (quantity: number) => void;
  onPriceChange?: (price: number) => void;
}

export type KitSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' | '4XL' | 'Youth S' | 'Youth M' | 'Youth L';
