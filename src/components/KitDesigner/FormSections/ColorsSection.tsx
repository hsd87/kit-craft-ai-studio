
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ColorPicker } from '../ColorPicker';
import { KitDesign } from '../types';
import { LogoPlacementCanvas } from '../LogoPlacementCanvas';
import { SponsorLogo } from '../types';
import { Separator } from '@/components/ui/separator';

interface ColorsSectionProps {
  design: KitDesign;
  onColorChange: (field: keyof KitDesign, value: string) => void;
  sponsorLogos?: SponsorLogo[];
  onSaveCanvas?: (canvasState: string, view: 'front' | 'back') => void;
}

export function ColorsSection({ 
  design, 
  onColorChange,
  sponsorLogos = [],
  onSaveCanvas = () => {}
}: ColorsSectionProps) {
  return (
    <AccordionItem value="colors" className="border rounded-lg overflow-hidden">
      <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
        <h3 className="text-lg font-medium">Colors & Design</h3>
      </AccordionTrigger>
      <AccordionContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorPicker
            label="Primary Color"
            color={design.primaryColor}
            onChange={(color) => onColorChange('primaryColor', color)}
          />
          
          <ColorPicker
            label="Secondary Color"
            color={design.secondaryColor}
            onChange={(color) => onColorChange('secondaryColor', color)}
          />
          
          <ColorPicker
            label="Third Color"
            color={design.thirdColor}
            onChange={(color) => onColorChange('thirdColor', color)}
          />
          
          <ColorPicker
            label="Fourth Color"
            color={design.fourthColor}
            onChange={(color) => onColorChange('fourthColor', color)}
          />
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h4 className="text-base font-medium mb-3">Logo Placement</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Use the canvas below to position, resize and rotate logos on your kit design.
          </p>
          
          {design.frontImageUrl && design.backImageUrl ? (
            <LogoPlacementCanvas 
              frontImageUrl={design.frontImageUrl}
              backImageUrl={design.backImageUrl}
              sponsorLogos={sponsorLogos}
              teamLogoUrl={design.teamLogoUrl}
              onSaveCanvas={onSaveCanvas}
              sportType={design.sport || 'football'}
            />
          ) : (
            <div className="p-6 border rounded-md bg-muted/50 text-center">
              <p>Generate your kit design first to enable logo placement.</p>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
