
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
  // Additional metadata could be added but isn't needed for prompt generation
}

export const generatePrompt = (params: KitDesignParams, viewType: 'front' | 'back'): string => {
  // Convert hex colors to color names when possible for better prompting
  const primaryColor = params.primaryColor;
  const secondaryColor = params.secondaryColor;
  const thirdColor = params.thirdColor;
  const fourthColor = params.fourthColor;
  
  // Base prompt template
  let prompt = `A professional sports jersey design for "${params.clubName}" football/soccer club`;
  
  // Add view type
  prompt += ` showing the ${viewType} view,`;
  
  // Add color information
  prompt += ` with primary color ${primaryColor}, secondary color ${secondaryColor}`;
  if (thirdColor && thirdColor !== '#FFFFFF') prompt += `, accent color ${thirdColor}`;
  if (fourthColor && fourthColor !== '#FFFFFF') prompt += `, detail color ${fourthColor}`;
  
  // Add collar style
  prompt += `, featuring a ${params.collarStyle} collar style`;
  
  // Add design style information
  prompt += `, with a ${params.designStyle} pattern design`;
  
  // Add sleeve information
  prompt += `, ${params.sleevePattern} sleeve design`;
  
  // Add fabric information
  prompt += `, made from ${params.fabricType}`;
  
  // Add regional styling cue if provided
  if (params.region) {
    prompt += `, inspired by ${params.region} football design traditions`;
  }
  
  // Add viewpoint and rendering quality
  prompt += `. The image should be a high-definition, professional product photo with proper lighting on a plain white background, photorealistic.`;
  
  return prompt;
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
