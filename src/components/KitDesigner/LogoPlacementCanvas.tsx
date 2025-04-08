
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { RotateCw, Trash, Upload, Save } from 'lucide-react';
import { SponsorLogo } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface LogoPlacementCanvasProps {
  frontImageUrl: string;
  backImageUrl: string;
  sponsorLogos: SponsorLogo[];
  teamLogoUrl?: string;
  onSaveCanvas: (canvasState: string, view: 'front' | 'back') => void;
}

export function LogoPlacementCanvas({ 
  frontImageUrl,
  backImageUrl,
  sponsorLogos,
  teamLogoUrl,
  onSaveCanvas
}: LogoPlacementCanvasProps) {
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const [frontCanvas, setFrontCanvas] = useState<fabric.Canvas | null>(null);
  const [backCanvas, setBackCanvas] = useState<fabric.Canvas | null>(null);
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [userLogos, setUserLogos] = useState<{id: string, url: string, name: string}[]>([]);

  // Initialize canvases
  useEffect(() => {
    if (frontCanvasRef.current && !frontCanvas) {
      const canvas = new fabric.Canvas(frontCanvasRef.current, {
        width: frontCanvasRef.current.offsetWidth,
        height: frontCanvasRef.current.offsetHeight,
        backgroundColor: '#f8f9fa',
        selection: true,
      });
      
      canvas.on('selection:created', (e) => {
        setSelectedObject(canvas.getActiveObject());
      });
      
      canvas.on('selection:updated', (e) => {
        setSelectedObject(canvas.getActiveObject());
      });
      
      canvas.on('selection:cleared', () => {
        setSelectedObject(null);
      });
      
      // Make canvas responsive
      const resizeCanvas = () => {
        if (!frontCanvasRef.current) return;
        const width = frontCanvasRef.current.offsetWidth;
        const height = frontCanvasRef.current.offsetHeight;
        canvas.setDimensions({ width, height });
        canvas.renderAll();
      };
      
      window.addEventListener('resize', resizeCanvas);
      setFrontCanvas(canvas);
      
      return () => window.removeEventListener('resize', resizeCanvas);
    }
    
    if (backCanvasRef.current && !backCanvas) {
      const canvas = new fabric.Canvas(backCanvasRef.current, {
        width: backCanvasRef.current.offsetWidth,
        height: backCanvasRef.current.offsetHeight,
        backgroundColor: '#f8f9fa',
        selection: true,
      });
      
      canvas.on('selection:created', (e) => {
        setSelectedObject(canvas.getActiveObject());
      });
      
      canvas.on('selection:updated', (e) => {
        setSelectedObject(canvas.getActiveObject());
      });
      
      canvas.on('selection:cleared', () => {
        setSelectedObject(null);
      });
      
      // Make canvas responsive
      const resizeCanvas = () => {
        if (!backCanvasRef.current) return;
        const width = backCanvasRef.current.offsetWidth;
        const height = backCanvasRef.current.offsetHeight;
        canvas.setDimensions({ width, height });
        canvas.renderAll();
      };
      
      window.addEventListener('resize', resizeCanvas);
      setBackCanvas(canvas);
      
      return () => window.removeEventListener('resize', resizeCanvas);
    }
    
    return () => {
      frontCanvas?.dispose();
      backCanvas?.dispose();
    };
  }, [frontCanvasRef, backCanvasRef]);

  // Load kit images when URLs change
  useEffect(() => {
    if (!frontCanvas || !backCanvas) return;
    
    // Load front image
    if (frontImageUrl) {
      fabric.Image.fromURL(frontImageUrl, (img) => {
        img.scaleToWidth(frontCanvas.getWidth() || 400);
        frontCanvas.setBackgroundImage(img, frontCanvas.renderAll.bind(frontCanvas));
      }, { crossOrigin: 'anonymous' });
    }
    
    // Load back image
    if (backImageUrl) {
      fabric.Image.fromURL(backImageUrl, (img) => {
        img.scaleToWidth(backCanvas.getWidth() || 400);
        backCanvas.setBackgroundImage(img, backCanvas.renderAll.bind(backCanvas));
      }, { crossOrigin: 'anonymous' });
    }
  }, [frontCanvas, backCanvas, frontImageUrl, backImageUrl]);

  // Combine sponsor logos and team logo
  useEffect(() => {
    const logos = [];
    
    // Add team logo if available
    if (teamLogoUrl) {
      logos.push({
        id: 'team-logo',
        url: teamLogoUrl,
        name: 'Team Logo'
      });
    }
    
    // Add sponsor logos
    sponsorLogos.forEach(sponsor => {
      if (sponsor.logoUrl) {
        logos.push({
          id: sponsor.id,
          url: sponsor.logoUrl,
          name: sponsor.name || `Sponsor ${logos.length + 1}`
        });
      }
    });
    
    setUserLogos(logos);
  }, [sponsorLogos, teamLogoUrl]);

  const handleAddLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      
      const newLogo = {
        id: `logo-${Date.now()}`,
        url: e.target.result as string,
        name: file.name
      };
      
      setUserLogos([...userLogos, newLogo]);
    };
    reader.readAsDataURL(file);
  };
  
  const addLogoToCanvas = (logoUrl: string) => {
    const canvas = activeView === 'front' ? frontCanvas : backCanvas;
    if (!canvas) return;
    
    fabric.Image.fromURL(logoUrl, (img) => {
      img.scaleToWidth(80);
      img.set({
        left: 100,
        top: 100,
        cornerSize: 7,
        hasRotatingPoint: true,
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      setSelectedObject(img);
    });
  };

  const handleSaveCanvas = () => {
    const canvas = activeView === 'front' ? frontCanvas : backCanvas;
    if (!canvas) return;
    
    try {
      const json = JSON.stringify(canvas.toJSON());
      onSaveCanvas(json, activeView);
      toast.success(`${activeView === 'front' ? 'Front' : 'Back'} view saved successfully!`);
    } catch (error) {
      console.error('Error saving canvas:', error);
      toast.error('Failed to save canvas state');
    }
  };

  const handleDeleteSelected = () => {
    const canvas = activeView === 'front' ? frontCanvas : backCanvas;
    if (!canvas || !selectedObject) return;
    
    canvas.remove(selectedObject);
    canvas.renderAll();
    setSelectedObject(null);
  };

  const handleRotateSelected = () => {
    if (!selectedObject) return;
    
    selectedObject.rotate((selectedObject.angle || 0) + 45);
    const canvas = activeView === 'front' ? frontCanvas : backCanvas;
    canvas?.renderAll();
  };

  const snapToPosition = (position: 'center' | 'left-chest' | 'right-chest' | 'back-top') => {
    const canvas = activeView === 'front' ? frontCanvas : backCanvas;
    if (!canvas || !selectedObject) return;
    
    const positions = {
      'center': { left: canvas.getWidth()! / 2, top: canvas.getHeight()! / 2 },
      'left-chest': { left: canvas.getWidth()! * 0.25, top: canvas.getHeight()! * 0.25 },
      'right-chest': { left: canvas.getWidth()! * 0.75, top: canvas.getHeight()! * 0.25 },
      'back-top': { left: canvas.getWidth()! / 2, top: canvas.getHeight()! * 0.15 },
    };
    
    selectedObject.set({
      left: positions[position].left,
      top: positions[position].top,
    });
    
    canvas.renderAll();
  };

  return (
    <div className="grid grid-cols-[200px_1fr] gap-4 h-full">
      {/* Logo sidebar */}
      <div className="bg-muted/30 rounded-lg overflow-hidden border">
        <div className="p-3 bg-muted/50 border-b">
          <h4 className="font-medium text-sm">Logos</h4>
          <p className="text-xs text-muted-foreground">Drag logos to canvas</p>
        </div>
        <ScrollArea className="h-[calc(100%-56px)]">
          <div className="p-3 space-y-3">
            {userLogos.length > 0 ? (
              userLogos.map((logo) => (
                <div 
                  key={logo.id} 
                  className="p-2 bg-white rounded border flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => addLogoToCanvas(logo.url)}
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-1">
                    <img src={logo.url} alt={logo.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="text-xs font-medium truncate w-full text-center">{logo.name}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground text-sm">
                <p>No logos available</p>
                <p className="text-xs mt-1">Upload logos using the button below</p>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              onClick={() => document.getElementById('logo-upload')?.click()}
            >
              <Upload className="mr-2 h-3 w-3" />
              Upload Logo
            </Button>
            <input 
              id="logo-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAddLogo} 
            />
          </div>
        </ScrollArea>
      </div>
      
      {/* Canvas area */}
      <div className="relative h-full">
        <div className="absolute inset-0">
          <div className={`h-full ${activeView === 'front' ? 'block' : 'hidden'}`}>
            <canvas ref={frontCanvasRef} className="w-full h-full" />
          </div>
          <div className={`h-full ${activeView === 'back' ? 'block' : 'hidden'}`}>
            <canvas ref={backCanvasRef} className="w-full h-full" />
          </div>
        </div>
        
        {/* Canvas controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleSaveCanvas}>
            <Save className="mr-1 h-3 w-3" />
            Save
          </Button>
          
          {selectedObject && (
            <>
              <Button variant="secondary" size="sm" onClick={handleRotateSelected}>
                <RotateCw className="mr-1 h-3 w-3" />
                Rotate
              </Button>
              <Button variant="secondary" size="sm" onClick={handleDeleteSelected}>
                <Trash className="mr-1 h-3 w-3" />
                Delete
              </Button>
            </>
          )}
        </div>
        
        {/* Snap positions */}
        {selectedObject && (
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-md border shadow-sm">
            <Label className="text-xs mb-1 block">Snap to:</Label>
            <div className="flex flex-wrap gap-1">
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => snapToPosition('center')}>
                Center
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => snapToPosition('left-chest')}>
                Left Chest
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => snapToPosition('right-chest')}>
                Right Chest
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => snapToPosition('back-top')}>
                Back Top
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
