
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { storeGeneratedImage } from '@/services/storageService';

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
}

export function KitPreview({ kitDesign, isGenerating, onGenerateRequest }: KitPreviewProps) {
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
        <h3 className="text-xl font-semibold">Kit Preview</h3>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={generateBothViews}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Design'}
        </Button>
      </div>
      
      <Tabs 
        defaultValue={activeView} 
        onValueChange={(val) => setActiveView(val as 'front' | 'back')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="front">Front View</TabsTrigger>
          <TabsTrigger value="back">Back View</TabsTrigger>
        </TabsList>
        
        <div className="mt-6 rounded-lg overflow-hidden bg-gray-50 border aspect-[3/4] flex items-center justify-center">
          <TabsContent value="front" className="w-full h-full">
            {loading.front ? (
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            ) : images.front ? (
              <div className="w-full h-full relative">
                <img 
                  src={images.front} 
                  alt="Kit Front View" 
                  className="w-full h-full object-contain"
                />
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="absolute bottom-4 right-4"
                  onClick={() => images.front && handleDownload(images.front, 'front')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                <p>Your kit preview will appear here</p>
                <p className="text-sm mt-2">Click "Generate Design" to create</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="back" className="w-full h-full">
            {loading.back ? (
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            ) : images.back ? (
              <div className="w-full h-full relative">
                <img 
                  src={images.back} 
                  alt="Kit Back View" 
                  className="w-full h-full object-contain"
                />
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="absolute bottom-4 right-4"
                  onClick={() => images.back && handleDownload(images.back, 'back')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                <p>Your kit preview will appear here</p>
                <p className="text-sm mt-2">Click "Generate Design" to create</p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
