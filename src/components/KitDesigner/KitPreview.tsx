
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { generateKitImage } from '@/lib/aiService';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';

interface KitPreviewProps {
  kitDesign: {
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
  
  // This would be connected to actual AI generation in real app
  const generateImages = async () => {
    // Set loading states
    setLoading({ front: true, back: true });
    
    try {
      // In a real implementation, these would be API calls to OpenAI or similar
      const frontImage = await generateKitImage(kitDesign, 'front');
      
      // Update front image and mark as not loading
      setImages(prev => ({ ...prev, front: frontImage }));
      setLoading(prev => ({ ...prev, front: false }));
      
      // Generate back image with a slight delay
      setTimeout(async () => {
        const backImage = await generateKitImage(kitDesign, 'back');
        setImages(prev => ({ ...prev, back: backImage }));
        setLoading(prev => ({ ...prev, back: false }));
      }, 500);
    } catch (error) {
      console.error('Error generating images:', error);
      setLoading({ front: false, back: false });
    }
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
          onClick={onGenerateRequest}
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
