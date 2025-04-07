
import { useEffect, useRef, useState } from 'react';
import { Canvas, Image as FabricImage, IEvent } from 'fabric';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SponsorLogo } from './types';
import { Upload, Save, RotateCw, Trash } from 'lucide-react';

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
  const [frontCanvas, setFrontCanvas] = useState<Canvas | null>(null);
  const [backCanvas, setBackCanvas] = useState<Canvas | null>(null);
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [selectedObject, setSelectedObject] = useState<any | null>(null);

  // Initialize canvases
  useEffect(() => {
    if (frontCanvasRef.current && !frontCanvas) {
      const canvas = new Canvas(frontCanvasRef.current, {
        width: 400,
        height: 500,
        backgroundColor: '#f8f9fa',
        selection: true,
      });
      
      canvas.on('selection:created', (e: IEvent) => {
        setSelectedObject(canvas.getActiveObject());
      });
      
      canvas.on('selection:updated', (e: IEvent) => {
        setSelectedObject(canvas.getActiveObject());
      });
      
      canvas.on('selection:cleared', () => {
        setSelectedObject(null);
      });
      
      setFrontCanvas(canvas);
    }
    
    if (backCanvasRef.current && !backCanvas) {
      const canvas = new Canvas(backCanvasRef.current, {
        width: 400,
        height: 500,
        backgroundColor: '#f8f9fa',
        selection: true,
      });
      
      canvas.on('selection:created', (e: IEvent) => {
        setSelectedObject(canvas.getActiveObject());
      });
      
      canvas.on('selection:updated', (e: IEvent) => {
        setSelectedObject(canvas.getActiveObject());
      });
      
      canvas.on('selection:cleared', () => {
        setSelectedObject(null);
      });
      
      setBackCanvas(canvas);
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
      FabricImage.fromURL(frontImageUrl, (img) => {
        img.scaleToWidth(frontCanvas.width || 400);
        frontCanvas.setBackgroundImage(img, frontCanvas.renderAll.bind(frontCanvas));
      }, { crossOrigin: 'anonymous' });
    }
    
    // Load back image
    if (backImageUrl) {
      FabricImage.fromURL(backImageUrl, (img) => {
        img.scaleToWidth(backCanvas.width || 400);
        backCanvas.setBackgroundImage(img, backCanvas.renderAll.bind(backCanvas));
      }, { crossOrigin: 'anonymous' });
    }
  }, [frontCanvas, backCanvas, frontImageUrl, backImageUrl]);

  // Load team logo if available
  useEffect(() => {
    if (!frontCanvas || !teamLogoUrl) return;
    
    FabricImage.fromURL(teamLogoUrl, (img) => {
      img.scaleToWidth(80);
      img.set({
        left: 50,
        top: 100,
        cornerSize: 7,
        hasRotatingPoint: true,
      });
      frontCanvas.add(img);
      frontCanvas.renderAll();
    }, { crossOrigin: 'anonymous' });
  }, [frontCanvas, teamLogoUrl]);

  // Load sponsor logos if available
  useEffect(() => {
    if (!frontCanvas || !backCanvas) return;
    
    // Clear existing sponsor logos
    const frontObjects = frontCanvas.getObjects();
    const backObjects = backCanvas.getObjects();
    
    sponsorLogos.forEach(sponsor => {
      if (!sponsor.logoUrl) return;
      
      FabricImage.fromURL(sponsor.logoUrl, (img) => {
        img.scaleToWidth(80);
        
        const placementPositions = {
          'front-center': { canvas: frontCanvas, left: 200, top: 150 },
          'back-top': { canvas: backCanvas, left: 200, top: 80 },
          'right-sleeve': { canvas: frontCanvas, left: 50, top: 150 },
          'left-sleeve': { canvas: frontCanvas, left: 350, top: 150 },
        };
        
        const placement = placementPositions[sponsor.placement as keyof typeof placementPositions];
        
        if (placement) {
          img.set({
            left: placement.left,
            top: placement.top,
            cornerSize: 7,
            hasRotatingPoint: true,
            data: { id: sponsor.id, type: 'sponsor' }
          });
          
          placement.canvas.add(img);
          placement.canvas.renderAll();
        }
      }, { crossOrigin: 'anonymous' });
    });
  }, [frontCanvas, backCanvas, sponsorLogos]);

  const handleAddLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const canvas = activeView === 'front' ? frontCanvas : backCanvas;
      if (!canvas) return;
      
      FabricImage.fromURL(e.target?.result as string, (img) => {
        img.scaleToWidth(100);
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
    reader.readAsDataURL(file);
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
      'center': { left: 200, top: 150 },
      'left-chest': { left: 150, top: 100 },
      'right-chest': { left: 250, top: 100 },
      'back-top': { left: 200, top: 80 },
    };
    
    selectedObject.set({
      left: positions[position].left,
      top: positions[position].top,
    });
    
    canvas.renderAll();
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'front' | 'back')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="front">Front View</TabsTrigger>
          <TabsTrigger value="back">Back View</TabsTrigger>
        </TabsList>
        <TabsContent value="front" className="space-y-4">
          <div className="border rounded-md overflow-hidden bg-white">
            <canvas ref={frontCanvasRef} className="mx-auto" />
          </div>
        </TabsContent>
        <TabsContent value="back" className="space-y-4">
          <div className="border rounded-md overflow-hidden bg-white">
            <canvas ref={backCanvasRef} className="mx-auto" />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()} className="flex-1">
          <Upload className="mr-2 h-4 w-4" />
          Upload Logo
        </Button>
        <input 
          id="logo-upload" 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleAddLogo} 
        />
        
        <Button variant="outline" onClick={handleSaveCanvas} className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          Save Canvas
        </Button>
      </div>

      {selectedObject && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleRotateSelected()}>
              <RotateCw className="mr-2 h-4 w-4" />
              Rotate
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDeleteSelected()}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
          
          <div>
            <Label className="mb-1 block">Snap to Position:</Label>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => snapToPosition('center')}>
                Center
              </Button>
              <Button variant="secondary" size="sm" onClick={() => snapToPosition('left-chest')}>
                Left Chest
              </Button>
              <Button variant="secondary" size="sm" onClick={() => snapToPosition('right-chest')}>
                Right Chest
              </Button>
              <Button variant="secondary" size="sm" onClick={() => snapToPosition('back-top')}>
                Back Top
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
