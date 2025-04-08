
import { SportType } from '@/components/KitDesigner/types';

export interface SportProductsMapping {
  baseKit: string[];
  complement: string[];
  optional: string[];
}

export const complementingProducts: Record<SportType, SportProductsMapping> = {
  football: {
    baseKit: ['jersey', 'shorts'],
    complement: ['socks'],
    optional: ['captain_armband', 'beanie', 'gloves']
  },
  cricket: {
    baseKit: ['jersey', 'pants'],
    complement: ['cap'],
    optional: ['bag', 'gloves']
  },
  basketball: {
    baseKit: ['jersey', 'shorts'],
    complement: [],
    optional: ['armband', 'bag']
  },
  rugby: {
    baseKit: ['jersey', 'shorts'],
    complement: ['socks'],
    optional: ['gloves', 'bag']
  },
  volleyball: {
    baseKit: ['jersey', 'shorts'],
    complement: [],
    optional: ['kneepads', 'bag']
  },
  baseball: {
    baseKit: ['jersey', 'pants'],
    complement: ['cap'],
    optional: ['bag']
  }
};

export const generateDesignPrompt = (
  sport: SportType, 
  teamName: string, 
  colors: string[], 
  style: string
): string => {
  const sportMap = complementingProducts[sport];
  const kitItems = [...sportMap.baseKit, ...sportMap.complement];

  return `
You are designing a full ${sport} team kit for a team named "${teamName}".
The color palette is: ${colors.join(', ')}.
Style: ${style} (modern, minimal, retro, etc.)

Generate individual designs for:
- ${kitItems.join(', ')}

Make sure all elements match visually and feel like part of a unified team identity.
Output should include layout suggestions for each item.
  `;
};

export const generateOrderKit = (
  sport: SportType, 
  selectedAddOns: string[] = []
): string[] => {
  const base = complementingProducts[sport].baseKit;
  const complement = complementingProducts[sport].complement;
  const defaultKit = [...base, ...complement];
  const fullKit = [...new Set([...defaultKit, ...selectedAddOns])];
  return fullKit;
};
