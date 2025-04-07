
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { calculatePrice, PricingOptions } from '@/lib/pricingLogic';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

export interface PricingCalculatorProps {
  collarStyle: string;
  designStyle: string;
  fabricType: string;
  makingType: string;
  sleevePattern: string;
  hasTeamLogo: boolean;
  sponsorCount: number;
  onQuantityChange: (quantity: number) => void;
  onPriceChange?: (price: number) => void;
}

export function PricingCalculator({
  collarStyle,
  designStyle,
  fabricType,
  makingType,
  sleevePattern,
  hasTeamLogo,
  sponsorCount,
  onQuantityChange,
  onPriceChange
}: PricingCalculatorProps) {
  const [quantity, setQuantity] = useState(10);
  const [playerDetails, setPlayerDetails] = useState({
    names: true,
    numbers: true
  });
  
  const [kitOptions, setKitOptions] = useState({
    includeShorts: false,
    includeSocks: false,
    aiEnhanced: true
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
      sponsorCount,
      includeShorts: kitOptions.includeShorts,
      includeSocks: kitOptions.includeSocks,
      aiEnhanced: kitOptions.aiEnhanced
    };
    
    const price = calculatePrice(options);
    setPricing(price);
    
    if (onPriceChange) {
      onPriceChange(price.total);
    }
  }, [
    quantity,
    collarStyle,
    designStyle,
    fabricType,
    makingType,
    sleevePattern,
    hasTeamLogo,
    playerDetails,
    sponsorCount,
    kitOptions,
    onPriceChange
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
               quantity >= 10 ? '10% bulk discount' : ''}
            </span>
          </div>
          <Slider
            defaultValue={[quantity]}
            min={1}
            max={50}
            step={1}
            onValueChange={handleQuantityChange}
          />
          {quantity >= 10 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-primary flex items-center mt-1">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Bulk discount applied!
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">
                    {quantity >= 20 
                      ? 'Orders of 20+ kits get a 15% discount' 
                      : 'Orders of 10+ kits get a 10% discount'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="space-y-3 border-t pt-3">
          <h4 className="font-medium text-sm">Kit Options</h4>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="include-shorts" className="flex items-center gap-2">
              Include Shorts
              <span className="text-sm font-normal text-muted-foreground">(+$15 per kit)</span>
            </Label>
            <Switch 
              id="include-shorts" 
              checked={kitOptions.includeShorts}
              onCheckedChange={(checked) => setKitOptions(prev => ({ ...prev, includeShorts: checked }))} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="include-socks" className="flex items-center gap-2">
              Include Socks
              <span className="text-sm font-normal text-muted-foreground">(+$8 per kit)</span>
            </Label>
            <Switch 
              id="include-socks" 
              checked={kitOptions.includeSocks}
              onCheckedChange={(checked) => setKitOptions(prev => ({ ...prev, includeSocks: checked }))} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enhanced" className="flex items-center gap-2">
              AI Enhanced Design
              <span className="text-sm font-normal text-muted-foreground">(+$5 per kit)</span>
            </Label>
            <Switch 
              id="ai-enhanced" 
              checked={kitOptions.aiEnhanced}
              onCheckedChange={(checked) => setKitOptions(prev => ({ ...prev, aiEnhanced: checked }))} 
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium text-sm mb-3">Pricing Breakdown</h4>
          
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Base Jersey Price:</span>
              <span>$30.00</span>
            </div>
            
            {kitOptions.includeShorts && (
              <div className="flex justify-between">
                <span>Shorts:</span>
                <span>+$15.00</span>
              </div>
            )}
            
            {kitOptions.includeSocks && (
              <div className="flex justify-between">
                <span>Socks:</span>
                <span>+$8.00</span>
              </div>
            )}
            
            {(playerDetails.names || playerDetails.numbers) && (
              <div className="flex justify-between">
                <span>Name & Number:</span>
                <span>+$2.00</span>
              </div>
            )}
            
            {hasTeamLogo && (
              <div className="flex justify-between">
                <span>Team Logo:</span>
                <span>+$5.00</span>
              </div>
            )}
            
            {sponsorCount > 0 && (
              <div className="flex justify-between">
                <span>Sponsor Logos ({sponsorCount}):</span>
                <span>+${(sponsorCount * 5).toFixed(2)}</span>
              </div>
            )}
            
            {kitOptions.aiEnhanced && (
              <div className="flex justify-between">
                <span>AI Enhancement:</span>
                <span>+$5.00</span>
              </div>
            )}
            
            {quantity >= 10 && (
              <div className="flex justify-between text-primary font-medium">
                <span>Bulk Discount:</span>
                <span>-{quantity >= 20 ? '15%' : '10%'}</span>
              </div>
            )}
          </div>
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
