
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { KitDesign } from '../types';

interface TeamInfoSectionProps {
  design: KitDesign;
  onChange: (field: keyof KitDesign, value: any) => void;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TeamInfoSection({ design, onChange, onLogoUpload }: TeamInfoSectionProps) {
  const regions = [
    'Asia', 
    'Europe', 
    'North America', 
    'South America', 
    'Africa', 
    'Australia/Oceania', 
    'Middle East'
  ];
  
  return (
    <AccordionItem value="team-info" className="border rounded-lg overflow-hidden">
      <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
        <h3 className="text-lg font-medium">Team Information</h3>
      </AccordionTrigger>
      <AccordionContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clubName">Club/Team Name</Label>
          <Input 
            id="clubName" 
            value={design.clubName}
            onChange={(e) => onChange('clubName', e.target.value)}
            placeholder="Enter club/team name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Select 
            value={design.region}
            onValueChange={(value) => onChange('region', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region.toLowerCase()}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="logo">Team Logo</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="logo" 
              type="file" 
              onChange={onLogoUpload}
              accept="image/*"
              className="flex-1"
            />
            {design.teamLogoUrl && (
              <div className="h-10 w-10 rounded-md border flex items-center justify-center bg-white/50">
                <img src={design.teamLogoUrl} alt="Logo" className="max-h-8 max-w-8" />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Upload your team logo (will appear on the left chest)
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
