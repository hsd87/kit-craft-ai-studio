
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { PlusCircle, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { SponsorLogo } from '../types';

interface SponsorsSectionProps {
  sponsorLogos: SponsorLogo[];
  onSponsorLogosChange: (logos: SponsorLogo[]) => void;
}

export function SponsorsSection({ 
  sponsorLogos, 
  onSponsorLogosChange 
}: SponsorsSectionProps) {
  const handleSponsorLogoUpload = (event: React.ChangeEvent<HTMLInputElement>, sponsorId: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, upload the file to your storage service
      // and get the URL. This is a mock implementation.
      const mockUrl = URL.createObjectURL(file);
      
      const updatedLogos = sponsorLogos.map(logo => 
        logo.id === sponsorId 
          ? { ...logo, logoUrl: mockUrl } 
          : logo
      );
      
      onSponsorLogosChange(updatedLogos);
      toast.success('Sponsor logo uploaded successfully');
    }
  };
  
  const addSponsorLogo = () => {
    if (sponsorLogos.length >= 4) {
      toast.error('Maximum 4 sponsor logos allowed');
      return;
    }
    
    const newSponsor: SponsorLogo = {
      id: `sponsor-${Date.now()}`,
      name: '',
      placement: 'front-center'
    };
    
    const updatedLogos = [...sponsorLogos, newSponsor];
    onSponsorLogosChange(updatedLogos);
  };
  
  const removeSponsorLogo = (id: string) => {
    const updatedLogos = sponsorLogos.filter(logo => logo.id !== id);
    onSponsorLogosChange(updatedLogos);
  };
  
  const updateSponsorLogo = (id: string, field: keyof SponsorLogo, value: string) => {
    const updatedLogos = sponsorLogos.map(logo => 
      logo.id === id ? { ...logo, [field]: value } : logo
    );
    onSponsorLogosChange(updatedLogos);
  };

  return (
    <AccordionItem value="sponsors" className="border rounded-lg overflow-hidden">
      <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
        <h3 className="text-lg font-medium">Sponsor Information</h3>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <div className="space-y-4">
          {sponsorLogos.map((sponsor) => (
            <div key={sponsor.id} className="p-3 border rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Sponsor</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeSponsorLogo(sponsor.id)}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`sponsor-name-${sponsor.id}`}>Sponsor Name</Label>
                <Input 
                  id={`sponsor-name-${sponsor.id}`}
                  value={sponsor.name}
                  onChange={(e) => updateSponsorLogo(sponsor.id, 'name', e.target.value)}
                  placeholder="Enter sponsor name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`sponsor-placement-${sponsor.id}`}>Logo Placement</Label>
                <Select 
                  value={sponsor.placement}
                  onValueChange={(value) => updateSponsorLogo(sponsor.id, 'placement', value)}
                >
                  <SelectTrigger id={`sponsor-placement-${sponsor.id}`}>
                    <SelectValue placeholder="Select placement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="front-center">Front Center</SelectItem>
                    <SelectItem value="back-top">Back Top</SelectItem>
                    <SelectItem value="right-sleeve">Right Sleeve</SelectItem>
                    <SelectItem value="left-sleeve">Left Sleeve</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`sponsor-logo-${sponsor.id}`}>Sponsor Logo</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id={`sponsor-logo-${sponsor.id}`}
                    type="file" 
                    onChange={(e) => handleSponsorLogoUpload(e, sponsor.id)}
                    accept="image/*"
                    className="flex-1"
                  />
                  {sponsor.logoUrl && (
                    <div className="h-10 w-10 rounded-md border flex items-center justify-center bg-white/50">
                      <img src={sponsor.logoUrl} alt="Logo" className="max-h-8 max-w-8" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={addSponsorLogo}
            disabled={sponsorLogos.length >= 4}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Sponsor (Max 4)
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
