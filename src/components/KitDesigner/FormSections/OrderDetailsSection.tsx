
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { KitDesign } from '../types';

interface OrderDetailsSectionProps {
  design: KitDesign;
  onKitTypeChange: (type: string, checked: boolean) => void;
  onChange: (field: keyof KitDesign, value: any) => void;
}

export function OrderDetailsSection({ 
  design, 
  onKitTypeChange, 
  onChange 
}: OrderDetailsSectionProps) {
  return (
    <AccordionItem value="order" className="border rounded-lg overflow-hidden">
      <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
        <h3 className="text-lg font-medium">Order Details</h3>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Kit Type</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kit-jersey"
                  checked={design.kitType.includes('jersey-only')}
                  onCheckedChange={(checked) => 
                    onKitTypeChange('jersey-only', checked === true)
                  }
                />
                <Label htmlFor="kit-jersey">Jersey Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kit-jersey-shorts"
                  checked={design.kitType.includes('jersey-shorts')}
                  onCheckedChange={(checked) => 
                    onKitTypeChange('jersey-shorts', checked === true)
                  }
                />
                <Label htmlFor="kit-jersey-shorts">Jersey + Shorts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kit-full"
                  checked={design.kitType.includes('full-kit')}
                  onCheckedChange={(checked) => 
                    onKitTypeChange('full-kit', checked === true)
                  }
                />
                <Label htmlFor="kit-full">Full Kit (Jersey + Shorts + Socks)</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deliveryRegion">Delivery Region/City</Label>
            <Input
              id="deliveryRegion"
              value={design.deliveryRegion}
              onChange={(e) => onChange('deliveryRegion', e.target.value)}
              placeholder="Enter delivery region or city"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="express-production"
              checked={design.expressProd}
              onCheckedChange={(checked) => 
                onChange('expressProd', checked === true)
              }
            />
            <div>
              <Label htmlFor="express-production">Express Production</Label>
              <p className="text-xs text-muted-foreground">Additional fee applies for faster production</p>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
