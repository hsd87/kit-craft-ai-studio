
import { SportType } from '@/components/KitDesigner/types';
import { generateDesignPrompt } from '@/utils/sportMapping';

interface KitDesignParams {
  primaryColor: string;
  secondaryColor: string;
  thirdColor: string;
  fourthColor: string;
  region: string;
  clubName: string;
  collarStyle: string;
  designStyle: string;
  fabricType: string;
  makingType: string;
  sleevePattern: string;
  sport: SportType;
  // Additional metadata could be added but isn't needed for prompt generation
}

// This is now a wrapper around the sport mapping utility
export const generatePrompt = (params: KitDesignParams, viewType: 'front' | 'back'): string => {
  const basePrompt = generateDesignPrompt(
    params.sport,
    params.clubName,
    [params.primaryColor, params.secondaryColor, params.thirdColor, params.fourthColor].filter(Boolean),
    params.designStyle
  );
  
  // Add view type to the prompt
  return basePrompt + ` Show the ${viewType} view of the jersey.`;
};

// In a real implementation, this would call your AI provider API
export const generateKitImage = async (
  params: KitDesignParams, 
  viewType: 'front' | 'back'
): Promise<string> => {
  // This is a mock implementation since we can't actually call OpenAI here
  // In a real app, this would call the OpenAI API and return the image URL
  
  const prompt = generatePrompt(params, viewType);
  console.log(`Generated prompt for ${viewType} view:`, prompt);
  
  // For demo purposes, return placeholder images
  // In the real app, you would call OpenAI API and return the generated image
  return `/placeholder-${viewType}.png`;
};
