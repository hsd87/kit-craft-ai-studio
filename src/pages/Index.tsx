
import { useState, useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { DesignerForm } from '@/components/KitDesigner/DesignerForm';
import { KitPreview } from '@/components/KitDesigner/KitPreview';
import { PricingCalculator } from '@/components/KitDesigner/PricingCalculator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { saveKitDesign } from '@/services/kitService';
import { uploadTeamLogo, uploadSponsorLogo } from '@/services/storageService';
import { KitDesign, PlayerInfo, SponsorLogo } from '@/components/KitDesigner/types';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const Index = () => {
  const { user } = useAuth();
  
  const [kitDesign, setKitDesign] = useState<KitDesign>({
    // User & Team Information
    clubName: 'Your Club',
    region: '',
    
    // Colors
    primaryColor: '#0A2463',
    secondaryColor: '#3E92CC',
    thirdColor: '#FFFFFF',
    fourthColor: '#1A1A1A',
    
    // Design & Style
    collarStyle: 'v-neck',
    designStyle: 'geometric',
    sleevePattern: 'normal',
    customPattern: '',
    fabricType: 'dry-fit-polyester',
    makingType: 'sublimation',
    
    // Logos
    teamLogoUrl: '',
    
    // Order & Pricing
    kitType: ['jersey-only'],
    quantity: 10,
    expressProd: false,
    deliveryRegion: '',
    
    // Canvas state
    frontCanvasJson: '',
    backCanvasJson: '',
    
    // Kit options
    includeShorts: false,
    includeSocks: false,
    aiEnhanced: true
  });
  
  // This would contain the sponsor logos
  const [sponsorLogos, setSponsorLogos] = useState<SponsorLogo[]>([]);
  
  // This would contain the players
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [kitPrice, setKitPrice] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleDesignChange = (newDesign: KitDesign) => {
    setKitDesign({...kitDesign, ...newDesign});
  };
  
  const handleGenerateRequest = () => {
    setIsGenerating(true);
    
    // Simulate AI generation time
    setTimeout(() => {
      setIsGenerating(false);
      
      // For demo purposes, set placeholder image URLs
      const frontImageUrl = '/placeholder.svg';
      const backImageUrl = '/placeholder.svg';
      
      setKitDesign(prev => ({
        ...prev,
        frontImageUrl,
        backImageUrl
      }));
      
      toast.success('Your kit design has been generated!');
    }, 2500);
  };
  
  const handleSaveCanvas = (canvasJson: string, view: 'front' | 'back') => {
    if (view === 'front') {
      setKitDesign(prev => ({...prev, frontCanvasJson: canvasJson}));
    } else {
      setKitDesign(prev => ({...prev, backCanvasJson: canvasJson}));
    }
  };
  
  const handleOrderNow = async () => {
    if (kitDesign.clubName === '') {
      toast.error('Please enter a club name before ordering');
      return;
    }
    
    if (!user) {
      toast.error('Please sign in to place an order');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // First, upload any logos
      let teamLogoUrl = kitDesign.teamLogoUrl;
      
      // Process sponsor logos if any
      const processedSponsorLogos = await Promise.all(
        sponsorLogos.map(async (sponsor: SponsorLogo) => {
          if (sponsor.logoUrl && typeof sponsor.logoUrl === 'string') {
            // Only upload if it's not already a URL
            if (!sponsor.logoUrl.startsWith('http')) {
              // This is a mock implementation - in real app would upload the file
              const logoUrl = sponsor.logoUrl;
              return { ...sponsor, logoUrl };
            }
          }
          return sponsor;
        })
      );
      
      // Save the design
      await saveKitDesign(
        { ...kitDesign },
        processedSponsorLogos,
        players
      );
      
      toast.success('Your order has been received! Our team will contact you shortly.');
    } catch (error) {
      console.error('Error saving design:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSponsorLogosChange = (newSponsorLogos: SponsorLogo[]) => {
    setSponsorLogos(newSponsorLogos);
  };
  
  const handlePlayersChange = (newPlayers: PlayerInfo[]) => {
    setPlayers(newPlayers);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    setKitDesign(prev => ({ ...prev, quantity: newQuantity }));
  };
  
  const MotionCard = motion(Card);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="flex-1 container py-8">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Design Your Custom Sports Kit
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Use our AI-powered designer to create professional sports kits for your team.
            Customize every detail and see your design come to life in real time.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Design Form */}
          <MotionCard 
            className="lg:col-span-5 shadow-md border-t-4 border-t-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardContent className="p-6">
              <DesignerForm 
                onDesignChange={handleDesignChange} 
                onGenerateRequest={handleGenerateRequest}
                onSponsorLogosChange={handleSponsorLogosChange}
                onPlayersChange={handlePlayersChange}
              />
            </CardContent>
          </MotionCard>
          
          {/* Right Column - Preview and Order */}
          <div className="lg:col-span-7 space-y-8">
            <MotionCard 
              className="shadow-md overflow-hidden border-t-4 border-t-secondary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CardContent className="p-6">
                <KitPreview 
                  kitDesign={kitDesign} 
                  isGenerating={isGenerating}
                  onGenerateRequest={handleGenerateRequest}
                  sponsorLogos={sponsorLogos}
                />
              </CardContent>
            </MotionCard>
            
            <MotionCard 
              className="shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Complete Your Order</h3>
                  </div>
                  
                  <PricingCalculator 
                    collarStyle={kitDesign.collarStyle}
                    designStyle={kitDesign.designStyle}
                    fabricType={kitDesign.fabricType}
                    makingType={kitDesign.makingType}
                    sleevePattern={kitDesign.sleevePattern}
                    hasTeamLogo={!!kitDesign.teamLogoUrl}
                    sponsorCount={sponsorLogos.length || 0}
                    onQuantityChange={handleQuantityChange}
                  />
                  
                  <Separator />
                  
                  <div>
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                      onClick={handleOrderNow}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Processing...' : 'Complete Order'}
                    </Button>
                    
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      By ordering, you agree to our terms and conditions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </MotionCard>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Profount.AI - Custom Sports Kit Design
            </p>
            
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
