
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ColorPicker } from '../ColorPicker';
import { KitDesign } from '../types';

interface ColorsSectionProps {
  design: KitDesign;
  onColorChange: (field: keyof KitDesign, value: string) => void;
}

export function ColorsSection({ design, onColorChange }: ColorsSectionProps) {
  return (
    <AccordionItem value="colors" className="border rounded-lg overflow-hidden">
      <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
        <h3 className="text-lg font-medium">Colors</h3>
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
      </AccordionContent>
    </AccordionItem>
  );
}
