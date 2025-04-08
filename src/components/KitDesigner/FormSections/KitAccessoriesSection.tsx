
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SportType } from '../types';
import { complementingProducts } from '@/utils/sportMapping';
import { Badge } from '@/components/ui/badge';

interface KitAccessoriesSectionProps {
  sport: SportType;
  selectedAccessories: string[];
  onAccessoryChange: (accessory: string, isChecked: boolean) => void;
}

export function KitAccessoriesSection({
  sport,
  selectedAccessories,
  onAccessoryChange
}: KitAccessoriesSectionProps) {
  const sportAccessories = complementingProducts[sport]?.optional || [];
  
  if (sportAccessories.length === 0) {
    return null;
  }

  const getReadableName = (value: string) => {
    return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const getAccessoryPrice = (accessory: string) => {
    const prices: Record<string, number> = {
      'captain_armband': 8,
      'beanie': 12,
      'gloves': 15,
      'bag': 25,
      'kneepads': 18,
      'cap': 15,
      'armband': 8
    };
    
    return prices[accessory] || 10;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-medium">Recommended Accessories</h4>
        <Badge variant="outline" className="bg-primary/10">
          Customizable with team colors
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sportAccessories.map((accessory) => (
          <Card key={accessory} className={`overflow-hidden transition-all ${
            selectedAccessories.includes(accessory) ? 'border-primary/50 shadow-sm' : ''
          }`}>
            <CardContent className="p-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={`accessory-${accessory}`}
                  checked={selectedAccessories.includes(accessory)}
                  onCheckedChange={(checked) => 
                    onAccessoryChange(accessory, checked === true)
                  }
                />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <Label 
                      htmlFor={`accessory-${accessory}`}
                      className="font-medium cursor-pointer"
                    >
                      {getReadableName(accessory)}
                    </Label>
                    <span className="text-sm font-medium">
                      ${getAccessoryPrice(accessory)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Custom {getReadableName(accessory).toLowerCase()} with your team colors and logo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
