
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KitDesign } from '../types';
import { complementingProducts } from '@/utils/sportMapping';

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
  const sport = design.sport || 'football';
  const sportConfig = complementingProducts[sport] || {
    baseKit: ['jersey'],
    complement: [],
    optional: []
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Kit Type</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="kit-jersey" 
              checked={design.kitType.includes('jersey-only')}
              onCheckedChange={(checked) => onKitTypeChange('jersey-only', checked === true)}
            />
            <Label htmlFor="kit-jersey">Jersey Only</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="kit-full" 
              checked={design.kitType.includes('full-kit')}
              onCheckedChange={(checked) => onKitTypeChange('full-kit', checked === true)}
            />
            <Label htmlFor="kit-full">Full Kit (includes {sportConfig.baseKit.join(', ')})</Label>
          </div>
          
          {sportConfig.complement.length > 0 && (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="kit-complement" 
                checked={design.kitType.includes('with-complement')}
                onCheckedChange={(checked) => onKitTypeChange('with-complement', checked === true)}
              />
              <Label htmlFor="kit-complement">With {sportConfig.complement.join(', ')}</Label>
            </div>
          )}
          
          {sportConfig.optional.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox 
                id={`kit-${item}`} 
                checked={design.kitType.includes(item)}
                onCheckedChange={(checked) => onKitTypeChange(item, checked === true)}
              />
              <Label htmlFor={`kit-${item}`}>{item.replace('_', ' ')}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={design.quantity}
            onChange={(e) => onChange('quantity', parseInt(e.target.value) || 1)}
          />
        </div>
        
        <div>
          <Label htmlFor="region">Delivery Region</Label>
          <Input
            id="region"
            value={design.deliveryRegion}
            onChange={(e) => onChange('deliveryRegion', e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="express"
          checked={design.expressProd}
          onCheckedChange={(checked) => onChange('expressProd', checked === true)}
        />
        <Label htmlFor="express">Express Production (+15%)</Label>
      </div>
    </div>
  );
}
