
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { KitDesign } from '../types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { complementingProducts } from '@/utils/sportMapping';
import { Info } from 'lucide-react';

interface KitStyleSectionProps {
  design: KitDesign;
  onChange: (field: keyof KitDesign, value: any) => void;
  availableCollarStyles?: string[];
  availableSleevePatterns?: string[];
}

export function KitStyleSection({ 
  design, 
  onChange,
  availableCollarStyles = ['v-neck', 'crew-neck', 'collar', 'collar-without-buttons'],
  availableSleevePatterns = ['normal', 'raglan', 'unique'] 
}: KitStyleSectionProps) {
  
  // Helper function to convert option values to readable names
  const getReadableName = (value: string) => {
    return value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  
  // Get the current sport's recommended kit pieces
  const sportKit = design.sport ? complementingProducts[design.sport] : null;
  
  return (
    <AccordionItem value="style" className="border rounded-lg">
      <AccordionTrigger className="px-4 py-2">Design & Style</AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
        {/* Collar Style */}
        <div className="space-y-2">
          <Label htmlFor="collar-style">Collar Style</Label>
          <Select 
            value={design.collarStyle}
            onValueChange={(value: string) => onChange('collarStyle', value)}
          >
            <SelectTrigger id="collar-style" className="w-full">
              <SelectValue placeholder="Select collar style" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableCollarStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {getReadableName(style)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Design Style */}
        <div className="space-y-2">
          <Label htmlFor="design-style">Design Style</Label>
          <Select 
            value={design.designStyle}
            onValueChange={(value: string) => onChange('designStyle', value)}
          >
            <SelectTrigger id="design-style" className="w-full">
              <SelectValue placeholder="Select design style" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="geometric">Geometric</SelectItem>
                <SelectItem value="stripes">Stripes</SelectItem>
                <SelectItem value="gradients">Gradients</SelectItem>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="retro">Retro</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Sleeve Pattern */}
        <div className="space-y-2">
          <Label htmlFor="sleeve-pattern">Sleeve Pattern</Label>
          <Select 
            value={design.sleevePattern}
            onValueChange={(value: string) => onChange('sleevePattern', value)}
          >
            <SelectTrigger id="sleeve-pattern" className="w-full">
              <SelectValue placeholder="Select sleeve pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableSleevePatterns.map((pattern) => (
                  <SelectItem key={pattern} value={pattern}>
                    {getReadableName(pattern)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Fabric Type */}
        <div className="space-y-2">
          <Label htmlFor="fabric-type">Fabric Type</Label>
          <Select 
            value={design.fabricType}
            onValueChange={(value: string) => onChange('fabricType', value)}
          >
            <SelectTrigger id="fabric-type" className="w-full">
              <SelectValue placeholder="Select fabric type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="dry-fit-polyester">Dry Fit Polyester</SelectItem>
                <SelectItem value="mesh-polyester">Mesh Polyester</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Making Type */}
        <div className="space-y-2">
          <Label htmlFor="making-type">Making Type</Label>
          <Select 
            value={design.makingType}
            onValueChange={(value: string) => onChange('makingType', value)}
          >
            <SelectTrigger id="making-type" className="w-full">
              <SelectValue placeholder="Select making type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="sublimation">Sublimation</SelectItem>
                <SelectItem value="cut-sew">Cut & Sew</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Sport Kit Recommendation */}
        {sportKit && (
          <div className="bg-muted/50 p-3 rounded-md mt-4 text-sm">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Recommended kit for {design.sport}:</p>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  {sportKit.baseKit.map(item => (
                    <li key={item}>• {getReadableName(item)} (Base)</li>
                  ))}
                  {sportKit.complement.map(item => (
                    <li key={item}>• {getReadableName(item)} (Complement)</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Custom Pattern */}
        {design.designStyle === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="custom-pattern">Custom Pattern Description</Label>
            <Textarea 
              id="custom-pattern"
              placeholder="Describe your custom pattern"
              value={design.customPattern}
              onChange={(e) => onChange('customPattern', e.target.value)}
              className="h-24"
            />
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
