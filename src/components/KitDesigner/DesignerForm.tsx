
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from './ColorPicker';
import { toast } from 'sonner';
import { PlusCircle, Trash, Upload } from 'lucide-react';
import { SizeChart } from './SizeChart';
import { KitSize, PlayerInfo, SponsorLogo, DesignerFormProps, KitDesign } from './types';

export function DesignerForm({ onDesignChange, onGenerateRequest, onSponsorLogosChange, onPlayersChange }: DesignerFormProps) {
  const [design, setDesign] = useState<KitDesign>({
    // User & Team Information
    clubName: '',
    region: '',
    
    // Colors
    primaryColor: '#0A2463',
    secondaryColor: '#3E92CC',
    thirdColor: '#FFFFFF',
    fourthColor: '#1A1A1A',
    
    // Design & Style
    collarStyle: 'v-neck',
    designStyle: 'geometric',
    sleevePattern: 'normal',
    customPattern: '',
    fabricType: 'dry-fit-polyester',
    makingType: 'sublimation',
    
    // Logos
    teamLogoUrl: '',
    
    // Order & Pricing
    kitType: ['jersey-only'],
    quantity: 10,
    expressProd: false,
    deliveryRegion: '',
  });
  
  const [sponsorLogos, setSponsorLogos] = useState<SponsorLogo[]>([]);
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [playerEntryMethod, setPlayerEntryMethod] = useState('manual');
  const [expandedSections, setExpandedSections] = useState<string[]>(['team-info', 'colors', 'style']);
  
  const regions = [
    'Asia', 
    'Europe', 
    'North America', 
    'South America', 
    'Africa', 
    'Australia/Oceania', 
    'Middle East'
  ];

  const availableSizes: KitSize[] = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', 
    'Youth S', 'Youth M', 'Youth L'
  ];
  
  const handleChange = (field: keyof KitDesign, value: any) => {
    const newDesign = { ...design, [field]: value };
    setDesign(newDesign);
    onDesignChange(newDesign);
  };
  
  const handleColorChange = (colorType: keyof KitDesign, color: string) => {
    handleChange(colorType, color);
  };
  
  const handleKitTypeChange = (type: string, checked: boolean) => {
    const currentKitTypes = [...design.kitType];
    if (checked) {
      if (!currentKitTypes.includes(type)) {
        currentKitTypes.push(type);
      }
    } else {
      const index = currentKitTypes.indexOf(type);
      if (index !== -1) {
        currentKitTypes.splice(index, 1);
      }
    }
    handleChange('kitType', currentKitTypes);
  };
  
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, upload the file to your storage service
      // and get the URL. This is a mock implementation.
      const mockUrl = URL.createObjectURL(file);
      handleChange('teamLogoUrl', mockUrl);
      toast.success('Logo uploaded successfully');
    }
  };
  
  const handleSponsorLogoUpload = (event: React.ChangeEvent<HTMLInputElement>, sponsorId: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, upload the file to your storage service
      // and get the URL. This is a mock implementation.
      const mockUrl = URL.createObjectURL(file);
      
      const updatedLogos = sponsorLogos.map(logo => 
        logo.id === sponsorId 
          ? { ...logo, logoUrl: mockUrl } 
          : logo
      );
      
      setSponsorLogos(updatedLogos);
      if (onSponsorLogosChange) {
        onSponsorLogosChange(updatedLogos);
      }
      
      toast.success('Sponsor logo uploaded successfully');
    }
  };
  
  const addSponsorLogo = () => {
    if (sponsorLogos.length >= 4) {
      toast.error('Maximum 4 sponsor logos allowed');
      return;
    }
    
    const newSponsor: SponsorLogo = {
      id: `sponsor-${Date.now()}`,
      name: '',
      placement: 'front-center'
    };
    
    const updatedLogos = [...sponsorLogos, newSponsor];
    setSponsorLogos(updatedLogos);
    if (onSponsorLogosChange) {
      onSponsorLogosChange(updatedLogos);
    }
  };
  
  const removeSponsorLogo = (id: string) => {
    const updatedLogos = sponsorLogos.filter(logo => logo.id !== id);
    setSponsorLogos(updatedLogos);
    if (onSponsorLogosChange) {
      onSponsorLogosChange(updatedLogos);
    }
  };
  
  const updateSponsorLogo = (id: string, field: keyof SponsorLogo, value: string) => {
    const updatedLogos = sponsorLogos.map(logo => 
      logo.id === id ? { ...logo, [field]: value } : logo
    );
    setSponsorLogos(updatedLogos);
    if (onSponsorLogosChange) {
      onSponsorLogosChange(updatedLogos);
    }
  };
  
  const addPlayer = () => {
    const newPlayer: PlayerInfo = {
      id: `player-${Date.now()}`,
      name: '',
      number: '',
      size: 'M'
    };
    
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    if (onPlayersChange) {
      onPlayersChange(updatedPlayers);
    }
  };
  
  const removePlayer = (id: string) => {
    const updatedPlayers = players.filter(player => player.id !== id);
    setPlayers(updatedPlayers);
    if (onPlayersChange) {
      onPlayersChange(updatedPlayers);
    }
  };
  
  const updatePlayer = (id: string, field: keyof PlayerInfo, value: string) => {
    const updatedPlayers = players.map(player => 
      player.id === id ? { ...player, [field]: value } : player
    );
    setPlayers(updatedPlayers);
    if (onPlayersChange) {
      onPlayersChange(updatedPlayers);
    }
  };
  
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split('\n');
        
        const newPlayers = lines
          .filter(line => line.trim() !== '')
          .map((line, index) => {
            const [name, number] = line.split(',').map(item => item.trim());
            return {
              id: `player-csv-${index}`,
              name: name || '',
              number: number || '',
              size: 'M' as KitSize
            };
          });
        
        setPlayers(newPlayers);
        if (onPlayersChange) {
          onPlayersChange(newPlayers);
        }
        toast.success(`Imported ${newPlayers.length} players`);
      } catch (error) {
        toast.error('Error parsing CSV file. Please check the format.');
      }
    };
    
    reader.readAsText(file);
  };
  
  const handleGenerateClick = () => {
    if (!design.clubName) {
      toast.error('Please enter a club name before generating');
      return;
    }
    
    // Add any additional validation here
    
    onGenerateRequest();
  };
  
  return (
    <div className="space-y-6">
      <Accordion 
        type="multiple" 
        defaultValue={expandedSections}
        onValueChange={setExpandedSections}
        className="space-y-4"
      >
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
                onChange={(e) => handleChange('clubName', e.target.value)}
                placeholder="Enter club/team name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select 
                value={design.region}
                onValueChange={(value) => handleChange('region', value)}
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
                  onChange={handleLogoUpload}
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
        
        <AccordionItem value="colors" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <h3 className="text-lg font-medium">Colors</h3>
          </AccordionTrigger>
          <AccordionContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPicker
                label="Primary Color"
                color={design.primaryColor}
                onChange={(color) => handleColorChange('primaryColor', color)}
              />
              
              <ColorPicker
                label="Secondary Color"
                color={design.secondaryColor}
                onChange={(color) => handleColorChange('secondaryColor', color)}
              />
              
              <ColorPicker
                label="Third Color"
                color={design.thirdColor}
                onChange={(color) => handleColorChange('thirdColor', color)}
              />
              
              <ColorPicker
                label="Fourth Color"
                color={design.fourthColor}
                onChange={(color) => handleColorChange('fourthColor', color)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
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
                  onValueChange={(value) => handleChange('collarStyle', value)}
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
                  onValueChange={(value) => handleChange('designStyle', value)}
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
                  onValueChange={(value) => handleChange('sleevePattern', value)}
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
                    onChange={(e) => handleChange('customPattern', e.target.value)}
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fabricType">Fabric Type</Label>
                <Select 
                  value={design.fabricType}
                  onValueChange={(value) => handleChange('fabricType', value)}
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
                  onValueChange={(value) => handleChange('makingType', value)}
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
        
        <AccordionItem value="sponsors" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <h3 className="text-lg font-medium">Sponsor Information</h3>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="space-y-4">
              {sponsorLogos.map((sponsor) => (
                <div key={sponsor.id} className="p-3 border rounded-md space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Sponsor</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeSponsorLogo(sponsor.id)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`sponsor-name-${sponsor.id}`}>Sponsor Name</Label>
                    <Input 
                      id={`sponsor-name-${sponsor.id}`}
                      value={sponsor.name}
                      onChange={(e) => updateSponsorLogo(sponsor.id, 'name', e.target.value)}
                      placeholder="Enter sponsor name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`sponsor-placement-${sponsor.id}`}>Logo Placement</Label>
                    <Select 
                      value={sponsor.placement}
                      onValueChange={(value) => updateSponsorLogo(sponsor.id, 'placement', value)}
                    >
                      <SelectTrigger id={`sponsor-placement-${sponsor.id}`}>
                        <SelectValue placeholder="Select placement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="front-center">Front Center</SelectItem>
                        <SelectItem value="back-top">Back Top</SelectItem>
                        <SelectItem value="right-sleeve">Right Sleeve</SelectItem>
                        <SelectItem value="left-sleeve">Left Sleeve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`sponsor-logo-${sponsor.id}`}>Sponsor Logo</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id={`sponsor-logo-${sponsor.id}`}
                        type="file" 
                        onChange={(e) => handleSponsorLogoUpload(e, sponsor.id)}
                        accept="image/*"
                        className="flex-1"
                      />
                      {sponsor.logoUrl && (
                        <div className="h-10 w-10 rounded-md border flex items-center justify-center bg-white/50">
                          <img src={sponsor.logoUrl} alt="Logo" className="max-h-8 max-w-8" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={addSponsorLogo}
                disabled={sponsorLogos.length >= 4}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Sponsor (Max 4)
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="players" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <h3 className="text-lg font-medium">Player Details</h3>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <Label>Entry Method</Label>
                  <RadioGroup 
                    value={playerEntryMethod} 
                    onValueChange={setPlayerEntryMethod}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="entry-manual" />
                      <Label htmlFor="entry-manual">Manual Entry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="csv" id="entry-csv" />
                      <Label htmlFor="entry-csv">CSV Upload</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <SizeChart />
              </div>
              
              {playerEntryMethod === 'csv' ? (
                <div className="space-y-2">
                  <Label htmlFor="csv-upload">Upload CSV File</Label>
                  <Input 
                    id="csv-upload" 
                    type="file" 
                    accept=".csv" 
                    onChange={handleCSVUpload}
                  />
                  <p className="text-xs text-muted-foreground">
                    CSV format: Name,Number (one player per line)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You'll be able to set sizes after import.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {players.map((player) => (
                    <div key={player.id} className="flex items-end gap-2">
                      <div className="flex-grow">
                        <Label htmlFor={`player-name-${player.id}`} className="text-xs">Name</Label>
                        <Input
                          id={`player-name-${player.id}`}
                          value={player.name}
                          onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                          placeholder="Player Name"
                        />
                      </div>
                      <div className="w-20">
                        <Label htmlFor={`player-number-${player.id}`} className="text-xs">Number</Label>
                        <Input
                          id={`player-number-${player.id}`}
                          value={player.number}
                          onChange={(e) => updatePlayer(player.id, 'number', e.target.value)}
                          placeholder="#"
                        />
                      </div>
                      <div className="w-24">
                        <Label htmlFor={`player-size-${player.id}`} className="text-xs">Size</Label>
                        <Select 
                          value={player.size || 'M'}
                          onValueChange={(value) => updatePlayer(player.id, 'size', value)}
                        >
                          <SelectTrigger id={`player-size-${player.id}`} className="h-10">
                            <SelectValue placeholder="Size" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePlayer(player.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={addPlayer}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Player
                  </Button>
                </div>
              )}
              
              {players.length > 0 && (
                <div className="border rounded-md p-3">
                  <h4 className="font-medium mb-2">Players List ({players.length})</h4>
                  <div className="max-h-48 overflow-y-auto">
                    {players.map((player) => (
                      <div key={player.id} className="flex justify-between py-1 border-b last:border-0">
                        <span>{player.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            Size: {player.size || 'M'}
                          </span>
                          <span className="font-semibold">#{player.number}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
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
                        handleKitTypeChange('jersey-only', checked === true)
                      }
                    />
                    <Label htmlFor="kit-jersey">Jersey Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="kit-jersey-shorts"
                      checked={design.kitType.includes('jersey-shorts')}
                      onCheckedChange={(checked) => 
                        handleKitTypeChange('jersey-shorts', checked === true)
                      }
                    />
                    <Label htmlFor="kit-jersey-shorts">Jersey + Shorts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="kit-full"
                      checked={design.kitType.includes('full-kit')}
                      onCheckedChange={(checked) => 
                        handleKitTypeChange('full-kit', checked === true)
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
                  onChange={(e) => handleChange('deliveryRegion', e.target.value)}
                  placeholder="Enter delivery region or city"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="express-production"
                  checked={design.expressProd}
                  onCheckedChange={(checked) => 
                    handleChange('expressProd', checked === true)
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
      </Accordion>
      
      <div className="pt-4">
        <Button 
          className="w-full"
          size="lg"
          onClick={handleGenerateClick}
        >
          Generate My Kit Design
        </Button>
      </div>
    </div>
  );
}
