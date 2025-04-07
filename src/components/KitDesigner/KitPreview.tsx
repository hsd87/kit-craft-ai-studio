
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { storeGeneratedImage } from '@/services/storageService';
import { LogoPlacementCanvas } from './LogoPlacementCanvas';
import { SponsorLogo } from './types';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface KitPreviewProps {
  kitDesign: {
    id?: string;
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
  };
  isGenerating: boolean;
  onGenerateRequest: () => void;
  sponsorLogos: SponsorLogo[];
}

export function KitPreview({ kitDesign, isGenerating, onGenerateRequest, sponsorLogos }: KitPreviewProps) {
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [images, setImages] = useState<{front: string | null; back: string | null}>({
    front: null,
    back: null
  });
  const [loading, setLoading] = useState<{front: boolean; back: boolean}>({
    front: false,
    back: false
  });
  
  const { user } = useAuth();
  
  // Generate kit design
  const generateKitImage = async (view: 'front' | 'back') => {
    try {
      setLoading(prev => ({ ...prev, [view]: true }));
      
      // Call our edge function
      const { data, error } = await supabase.functions.invoke('generate-kit', {
        body: {
          designParams: kitDesign,
          view
        }
      });
      
      if (error) throw error;
      
      // Store the resulting image URL
      setImages(prev => ({ ...prev, [view]: data.imageUrl }));
      
      // If we have a kit ID, store the generated image in Supabase storage
      if (kitDesign.id && data.imageUrl) {
        try {
          const storedUrl = await storeGeneratedImage(data.imageUrl, kitDesign.id, view);
          
          // Now update the kit_designs table with the new image URL
          const updateField = view === 'front' ? 'front_image_url' : 'back_image_url';
          
          await supabase
            .from('kit_designs')
            .update({ [updateField]: storedUrl })
            .eq('id', kitDesign.id);
            
        } catch (storageError) {
          console.error('Failed to store generated image:', storageError);
        }
      }
      
      return data.imageUrl;
    } catch (error) {
      console.error('Error generating kit image:', error);
      toast.error(`Failed to generate ${view} view`);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [view]: false }));
    }
  };
  
  // Generate both views when requested
  const generateBothViews = async () => {
    onGenerateRequest(); // Notify parent component
    
    // Generate front view first
    await generateKitImage('front');
    
    // Then generate back view with a slight delay
    setTimeout(async () => {
      await generateKitImage('back');
    }, 500);
  };
  
  // Handle downloading the image
  const handleDownload = (imageUrl: string, view: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${kitDesign.clubName}-kit-${view}-view.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleSaveCanvas = (canvasJson: string, view: 'front' | 'back') => {
    // Save canvas state to backend or local storage
    toast.success(`${view} view canvas saved`);
  };
  
  // In real app, this would trigger when design parameters change significantly
  useEffect(() => {
    // For demo purposes, we're using placeholder images
    setImages({
      front: '/placeholder.svg',
      back: '/placeholder.svg',
    });
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Design Preview</h3>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={() => handleDownload(activeView === 'front' ? images.front! : images.back!, activeView)}
          disabled={!(activeView === 'front' ? images.front : images.back)}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
        <AspectRatio ratio={16/9} className="overflow-hidden">
          <Tabs 
            defaultValue={activeView} 
            onValueChange={(val) => setActiveView(val as 'front' | 'back')}
            className="w-full h-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="front">Front View</TabsTrigger>
              <TabsTrigger value="back">Back View</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 h-[calc(100%-40px)] rounded-lg overflow-hidden">
              {!isGenerating && (images.front || images.back) ? (
                <>
                  <TabsContent value="front" className="h-full m-0 p-0">
                    <LogoPlacementCanvas 
                      frontImageUrl={images.front || '/placeholder.svg'}
                      backImageUrl={images.back || '/placeholder.svg'} 
                      sponsorLogos={sponsorLogos}
                      teamLogoUrl={kitDesign.teamLogoUrl}
                      onSaveCanvas={handleSaveCanvas}
                    />
                  </TabsContent>
                  
                  <TabsContent value="back" className="h-full m-0 p-0">
                    <LogoPlacementCanvas 
                      frontImageUrl={images.front || '/placeholder.svg'}
                      backImageUrl={images.back || '/placeholder.svg'} 
                      sponsorLogos={sponsorLogos}
                      teamLogoUrl={kitDesign.teamLogoUrl}
                      onSaveCanvas={handleSaveCanvas}
                    />
                  </TabsContent>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {loading.front || loading.back ? (
                    <div className="flex flex-col items-center justify-center">
                      <Skeleton className="w-64 h-64 rounded-md" />
                      <p className="mt-4 text-muted-foreground animate-pulse">Generating your kit design...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <p className="text-lg">Your kit design will appear here</p>
                      <p className="text-sm mt-2">Fill in the design form and click "Generate Design"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Tabs>
        </AspectRatio>
      </div>
    </div>
  );
}
