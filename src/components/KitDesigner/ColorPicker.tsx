
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const predefinedColors = [
  '#FF0000', '#FF5500', '#FFAA00', '#FFFF00', '#AAFF00', '#55FF00', 
  '#00FF00', '#00FF55', '#00FFAA', '#00FFFF', '#00AAFF', '#0055FF', 
  '#0000FF', '#5500FF', '#AA00FF', '#FF00FF', '#FF00AA', '#FF0055',
  '#FFFFFF', '#AAAAAA', '#555555', '#000000'
];

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(color || '#FFFFFF');

  useEffect(() => {
    if (color !== selectedColor) {
      setSelectedColor(color);
    }
  }, [color]);

  const handleSelectColor = (newColor: string) => {
    setSelectedColor(newColor);
    onChange(newColor);
  };

  const handleCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`color-${label.toLowerCase()}`}>
        {label}
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <button
            id={`color-${label.toLowerCase()}`}
            className={cn(
              "w-full h-10 flex items-center justify-between rounded-md border border-input px-3 py-2",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            style={{ backgroundColor: selectedColor }}
          >
            <span className={cn(
              "truncate", 
              selectedColor.toLowerCase() === '#ffffff' || selectedColor.toLowerCase() === '#fffffff' 
                ? 'text-black' 
                : (selectedColor.toLowerCase() === '#000000' || selectedColor.toLowerCase() === '#000000f')
                  ? 'text-white' 
                  : isDark(selectedColor) ? 'text-white' : 'text-black'
            )}>
              {selectedColor}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-2">
              {predefinedColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className={cn(
                    "h-6 w-6 rounded-md border border-gray-200",
                    selectedColor === presetColor && "ring-2 ring-secondary"
                  )}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleSelectColor(presetColor)}
                />
              ))}
            </div>
            
            <div>
              <Label htmlFor="custom-color" className="text-xs">Custom</Label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  id="custom-color"
                  type="color"
                  value={selectedColor}
                  onChange={handleCustomColor}
                  className="w-8 h-8 p-0 border-0 rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => handleSelectColor(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Helper function to determine if a color is dark
function isDark(color: string): boolean {
  // Remove any leading # if it exists
  color = color.replace('#', '');
  
  // Handle 3-digit hex
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  
  // Convert to RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  // Calculate brightness using YIQ formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return true if dark
  return brightness < 128;
}
