
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { KitDesign } from '../types';

interface KitStyleSectionProps {
  design: KitDesign;
  onChange: (field: keyof KitDesign, value: any) => void;
}

export function KitStyleSection({ design, onChange }: KitStyleSectionProps) {
  return (
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
              onValueChange={(value) => onChange('collarStyle', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select collar style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v-neck">V-Neck</SelectItem>
                <SelectItem value="crew-neck">Crew Neck</SelectItem>
                <SelectItem value="collar">Collar</SelectItem>
                <SelectItem value="collar-without-buttons">Collar (no buttons)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="designStyle">Design Style</Label>
            <Select 
              value={design.designStyle}
              onValueChange={(value) => onChange('designStyle', value)}
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
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sleevePattern">Sleeve Pattern</Label>
            <Select 
              value={design.sleevePattern}
              onValueChange={(value) => onChange('sleevePattern', value)}
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
            
            {design.sleevePattern === 'unique' && (
              <Input
                className="mt-2"
                placeholder="Describe custom sleeve pattern"
                value={design.customPattern}
                onChange={(e) => onChange('customPattern', e.target.value)}
              />
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fabricType">Fabric Type</Label>
            <Select 
              value={design.fabricType}
              onValueChange={(value) => onChange('fabricType', value)}
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
              onValueChange={(value) => onChange('makingType', value)}
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
  );
}
