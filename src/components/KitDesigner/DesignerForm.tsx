
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { KitDesign, DesignerFormProps, PlayerInfo, SponsorLogo, SportType, sportTemplates } from './types';
import { TeamInfoSection } from './FormSections/TeamInfoSection';
import { ColorsSection } from './FormSections/ColorsSection';
import { KitStyleSection } from './FormSections/KitStyleSection';
import { SponsorsSection } from './FormSections/SponsorsSection';
import { PlayersSection } from './FormSections/PlayersSection';
import { OrderDetailsSection } from './FormSections/OrderDetailsSection';

export function DesignerForm({ 
  onDesignChange, 
  onGenerateRequest, 
  onSponsorLogosChange, 
  onPlayersChange 
}: DesignerFormProps) {
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

    // Sport selection with default
    sport: 'football',
    
    // Canvas data by sport
    canvasData: {},
  });
  
  const [sponsorLogos, setSponsorLogos] = useState<SponsorLogo[]>([]);
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [playerEntryMethod, setPlayerEntryMethod] = useState('manual');
  const [expandedSections, setExpandedSections] = useState<string[]>(['team-info', 'colors', 'style']);
  const [availableCollarStyles, setAvailableCollarStyles] = useState<string[]>([]);
  const [availableSleevePatterns, setAvailableSleevePatterns] = useState<string[]>([]);
  
  // Set available options based on selected sport
  useEffect(() => {
    if (design.sport) {
      const sportConfig = sportTemplates[design.sport];
      
      setAvailableCollarStyles(sportConfig.options.collarStyles);
      setAvailableSleevePatterns(sportConfig.options.sleevePatterns);
      
      // If current collar style or sleeve pattern is not available for this sport, set to first available
      if (!sportConfig.options.collarStyles.includes(design.collarStyle)) {
        handleChange('collarStyle', sportConfig.options.collarStyles[0]);
      }
      
      if (!sportConfig.options.sleevePatterns.includes(design.sleevePattern)) {
        handleChange('sleevePattern', sportConfig.options.sleevePatterns[0]);
      }
    }
  }, [design.sport]);
  
  const handleChange = (field: keyof KitDesign, value: any) => {
    const newDesign = { ...design, [field]: value };
    setDesign(newDesign);
    onDesignChange(newDesign);
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
  
  const handleSponsorLogosChange = (updatedLogos: SponsorLogo[]) => {
    setSponsorLogos(updatedLogos);
    if (onSponsorLogosChange) {
      onSponsorLogosChange(updatedLogos);
    }
  };
  
  const handlePlayersChange = (updatedPlayers: PlayerInfo[]) => {
    setPlayers(updatedPlayers);
    if (onPlayersChange) {
      onPlayersChange(updatedPlayers);
    }
  };
  
  const handleSportChange = (sport: SportType) => {
    handleChange('sport', sport);
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
      {/* Sport Selection Dropdown */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="sport-select">
          Select Sport
        </label>
        <Select 
          value={design.sport} 
          onValueChange={(value) => handleSportChange(value as SportType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sports</SelectLabel>
              <SelectItem value="football">Football/Soccer</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
              <SelectItem value="cricket">Cricket</SelectItem>
              <SelectItem value="rugby">Rugby</SelectItem>
              <SelectItem value="volleyball">Volleyball</SelectItem>
              <SelectItem value="baseball">Baseball</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          This will customize design options specific to your selected sport
        </p>
      </div>
      
      <Accordion 
        type="multiple" 
        defaultValue={expandedSections}
        onValueChange={setExpandedSections}
        className="space-y-4"
      >
        <TeamInfoSection 
          design={design}
          onChange={handleChange}
          onLogoUpload={handleLogoUpload}
        />
        
        <ColorsSection 
          design={design}
          onColorChange={handleChange}
        />
        
        <KitStyleSection 
          design={design}
          onChange={handleChange}
          availableCollarStyles={availableCollarStyles}
          availableSleevePatterns={availableSleevePatterns}
        />
        
        <SponsorsSection 
          sponsorLogos={sponsorLogos}
          onSponsorLogosChange={handleSponsorLogosChange}
        />
        
        <PlayersSection 
          players={players}
          playerEntryMethod={playerEntryMethod}
          setPlayerEntryMethod={setPlayerEntryMethod}
          onPlayersChange={handlePlayersChange}
        />
        
        <OrderDetailsSection 
          design={design}
          onKitTypeChange={handleKitTypeChange}
          onChange={handleChange}
        />
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
