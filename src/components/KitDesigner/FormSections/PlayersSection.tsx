
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { PlusCircle, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { SizeChart } from '../SizeChart';
import { PlayerInfo, KitSize } from '../types';

interface PlayersSectionProps {
  players: PlayerInfo[];
  playerEntryMethod: string;
  setPlayerEntryMethod: (method: string) => void;
  onPlayersChange: (players: PlayerInfo[]) => void;
}

export function PlayersSection({
  players,
  playerEntryMethod,
  setPlayerEntryMethod,
  onPlayersChange
}: PlayersSectionProps) {
  const availableSizes: KitSize[] = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', 
    'Youth S', 'Youth M', 'Youth L'
  ];

  const addPlayer = () => {
    const newPlayer: PlayerInfo = {
      id: `player-${Date.now()}`,
      name: '',
      number: '',
      size: 'M'
    };
    
    const updatedPlayers = [...players, newPlayer];
    onPlayersChange(updatedPlayers);
  };
  
  const removePlayer = (id: string) => {
    const updatedPlayers = players.filter(player => player.id !== id);
    onPlayersChange(updatedPlayers);
  };
  
  const updatePlayer = (id: string, field: keyof PlayerInfo, value: string) => {
    const updatedPlayers = players.map(player => 
      player.id === id ? { ...player, [field]: value } : player
    );
    onPlayersChange(updatedPlayers);
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
        
        onPlayersChange(newPlayers);
        toast.success(`Imported ${newPlayers.length} players`);
      } catch (error) {
        toast.error('Error parsing CSV file. Please check the format.');
      }
    };
    
    reader.readAsText(file);
  };
  
  return (
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
  );
}
