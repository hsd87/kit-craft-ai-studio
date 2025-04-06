
import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { DesignerForm } from '@/components/KitDesigner/DesignerForm';
import { KitPreview } from '@/components/KitDesigner/KitPreview';
import { PricingCalculator } from '@/components/KitDesigner/PricingCalculator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const Index = () => {
  const [kitDesign, setKitDesign] = useState({
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
  });
  
  // This would contain the sponsor logos
  const [sponsorLogos, setSponsorLogos] = useState([]);
  
  // This would contain the players
  const [players, setPlayers] = useState([]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [quantity, setQuantity] = useState(10);
  
  const handleDesignChange = (newDesign: any) => {
    setKitDesign({...kitDesign, ...newDesign});
  };
  
  const handleGenerateRequest = () => {
    setIsGenerating(true);
    
    // Simulate AI generation time
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Your kit design has been generated!');
    }, 2500);
  };
  
  const handleOrderNow = () => {
    if (kitDesign.clubName === '') {
      toast.error('Please enter a club name before ordering');
      return;
    }
    
    toast.success('Your order has been received! Our team will contact you shortly.');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-display font-bold tracking-tight mb-4">
            Design Your Custom Sports Kit
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Use our AI-powered designer to create professional sports kits for your team.
            Customize every detail and see your design come to life in real time.
          </p>
        </div>
        
        <div className="designer-grid">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <DesignerForm 
                  onDesignChange={handleDesignChange} 
                  onGenerateRequest={handleGenerateRequest}
                />
              </CardContent>
            </Card>
            
            <PricingCalculator 
              collarStyle={kitDesign.collarStyle}
              designStyle={kitDesign.designStyle}
              fabricType={kitDesign.fabricType}
              makingType={kitDesign.makingType}
              sleevePattern={kitDesign.sleevePattern}
              hasTeamLogo={!!kitDesign.teamLogoUrl}
              sponsorCount={sponsorLogos.length || 0}
              onQuantityChange={setQuantity}
            />
            
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleOrderNow}
            >
              Order Now
            </Button>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <KitPreview 
                  kitDesign={kitDesign} 
                  isGenerating={isGenerating}
                  onGenerateRequest={handleGenerateRequest}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Profount.AI - Custom Sports Kit Design
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
