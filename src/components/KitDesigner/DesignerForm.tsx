
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { ColorPicker } from './ColorPicker';
import { toast } from 'sonner';

interface DesignerFormProps {
  onDesignChange: (design: any) => void;
  onGenerateRequest: () => void;
}

export function DesignerForm({ onDesignChange, onGenerateRequest }: DesignerFormProps) {
  const [design, setDesign] = useState({
    primaryColor: '#0A2463',
    secondaryColor: '#3E92CC',
    thirdColor: '#FFFFFF',
    fourthColor: '#1A1A1A',
    region: '',
    clubName: '',
    logoUrl: '',
    collarStyle: 'v-neck',
    designStyle: 'geometric',
    fabricType: 'dry-fit-polyester',
    makingType: 'sublimation',
    sleevePattern: 'normal',
    sponsors: []
  });
  
  const [expandedSections, setExpandedSections] = useState<string[]>(['colors', 'team', 'style']);
  
  const handleChange = (field: string, value: string) => {
    const newDesign = { ...design, [field]: value };
    setDesign(newDesign);
    onDesignChange(newDesign);
  };
  
  const handleColorChange = (colorType: string, color: string) => {
    const newDesign = { ...design, [colorType]: color };
    setDesign(newDesign);
    onDesignChange(newDesign);
  };
  
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, upload the file to your storage service
      // and get the URL. This is a mock implementation.
      const mockUrl = URL.createObjectURL(file);
      handleChange('logoUrl', mockUrl);
      toast.success('Logo uploaded successfully');
    }
  };
  
  const handleGenerateClick = () => {
    if (!design.clubName) {
      toast.error('Please enter a club name before generating');
      return;
    }
    
    onGenerateRequest();
  };
  
  return (
    <div className="space-y-6">
      <Accordion 
        type="multiple" 
        defaultValue={expandedSections}
        onValueChange={setExpandedSections}
        className="space-y-4"
      >
        <AccordionItem value="colors" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <h3 className="text-lg font-medium">Colors</h3>
          </AccordionTrigger>
          <AccordionContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPicker
                label="Primary Color"
                color={design.primaryColor}
                onChange={(color) => handleColorChange('primaryColor', color)}
              />
              
              <ColorPicker
                label="Secondary Color"
                color={design.secondaryColor}
                onChange={(color) => handleColorChange('secondaryColor', color)}
              />
              
              <ColorPicker
                label="Third Color"
                color={design.thirdColor}
                onChange={(color) => handleColorChange('thirdColor', color)}
              />
              
              <ColorPicker
                label="Fourth Color"
                color={design.fourthColor}
                onChange={(color) => handleColorChange('fourthColor', color)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="team" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <h3 className="text-lg font-medium">Team Information</h3>
          </AccordionTrigger>
          <AccordionContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clubName">Club Name</Label>
              <Input 
                id="clubName" 
                value={design.clubName}
                onChange={(e) => handleChange('clubName', e.target.value)}
                placeholder="Enter club name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input 
                id="region" 
                value={design.region}
                onChange={(e) => handleChange('region', e.target.value)}
                placeholder="Europe, South America, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logo">Team Logo</Label>
              <Input 
                id="logo" 
                type="file" 
                onChange={handleLogoUpload}
                accept="image/*"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload your team logo (will appear on the left chest)
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="style" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <h3 className="text-lg font-medium">Kit Style</h3>
          </AccordionTrigger>
          <AccordionContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collarStyle">Collar Style</Label>
                <Select 
                  value={design.collarStyle}
                  onValueChange={(value) => handleChange('collarStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select collar style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v-neck">V-Neck</SelectItem>
                    <SelectItem value="crew-neck">Crew Neck</SelectItem>
                    <SelectItem value="collar">Collar</SelectItem>
                    <SelectItem value="collar-without-buttons">Collar without Buttons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="designStyle">Design Style</Label>
                <Select 
                  value={design.designStyle}
                  onValueChange={(value) => handleChange('designStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select design style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geometric">Geometric</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                    <SelectItem value="dots">Dots</SelectItem>
                    <SelectItem value="stripes">Stripes</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="solid">Solid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sleevePattern">Sleeve Pattern</Label>
                <Select 
                  value={design.sleevePattern}
                  onValueChange={(value) => handleChange('sleevePattern', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sleeve pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="raglan">Raglan</SelectItem>
                    <SelectItem value="unique">Unique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fabricType">Fabric Type</Label>
                <Select 
                  value={design.fabricType}
                  onValueChange={(value) => handleChange('fabricType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fabric type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry-fit-polyester">Dry Fit Polyester</SelectItem>
                    <SelectItem value="mesh-polyester">Mesh Polyester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="makingType">Making Type</Label>
                <Select 
                  value={design.makingType}
                  onValueChange={(value) => handleChange('makingType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select making type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sublimation">Sublimation</SelectItem>
                    <SelectItem value="cut-sew">Cut & Sew</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="sponsors" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <h3 className="text-lg font-medium">Sponsor Information</h3>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">Add sponsor logos to your kit (coming soon)</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="players" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <h3 className="text-lg font-medium">Player Details</h3>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">Add player names and numbers (coming soon)</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="pt-4">
        <Button 
          className="w-full"
          size="lg"
          onClick={handleGenerateClick}
        >
          Generate My Kit Design
        </Button>
      </div>
    </div>
  );
}
