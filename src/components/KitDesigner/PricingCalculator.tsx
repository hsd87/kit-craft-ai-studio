
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { calculatePrice, PricingOptions } from '@/lib/pricingLogic';

interface PricingCalculatorProps {
  collarStyle: string;
  designStyle: string;
  fabricType: string;
  makingType: string;
  sleevePattern: string;
  hasTeamLogo: boolean;
  sponsorCount: number;
  onQuantityChange: (quantity: number) => void;
}

export function PricingCalculator({
  collarStyle,
  designStyle,
  fabricType,
  makingType,
  sleevePattern,
  hasTeamLogo,
  sponsorCount,
  onQuantityChange
}: PricingCalculatorProps) {
  const [quantity, setQuantity] = useState(10);
  const [playerDetails, setPlayerDetails] = useState({
    names: true,
    numbers: true
  });
  
  const [pricing, setPricing] = useState({ total: 0, unitPrice: 0 });
  
  useEffect(() => {
    // Calculate price whenever relevant props change
    const options: PricingOptions = {
      quantity,
      collarStyle,
      designStyle,
      fabricType, 
      makingType,
      sleevePattern,
      hasTeamLogo,
      playerNames: playerDetails.names,
      playerNumbers: playerDetails.numbers,
      sponsorCount
    };
    
    const price = calculatePrice(options);
    setPricing(price);
  }, [
    quantity,
    collarStyle,
    designStyle,
    fabricType,
    makingType,
    sleevePattern,
    hasTeamLogo,
    playerDetails,
    sponsorCount
  ]);
  
  const handleQuantityChange = (value: number[]) => {
    const newQuantity = value[0];
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };
  
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold">Pricing</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Quantity: {quantity}</Label>
            <span className="text-sm text-muted-foreground">
              {quantity >= 20 ? '15% bulk discount' : 
               quantity >= 15 ? '10% bulk discount' : 
               quantity >= 10 ? '5% bulk discount' : ''}
            </span>
          </div>
          <Slider
            defaultValue={[quantity]}
            min={1}
            max={50}
            step={1}
            onValueChange={handleQuantityChange}
          />
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <span>Unit Price:</span>
          <span className="font-medium">${pricing.unitPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total Price:</span>
          <span className="text-primary">${pricing.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
