
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ruler } from 'lucide-react';

export function SizeChart() {
  const [open, setOpen] = useState(false);
  
  const adultSizes = [
    { size: 'XS', chest: '34-36"', waist: '28-30"', height: "5'4\"-5'7\"" },
    { size: 'S', chest: '36-38"', waist: '30-32"', height: "5'7\"-5'10\"" },
    { size: 'M', chest: '38-40"', waist: '32-34"', height: "5'10\"-6'0\"" },
    { size: 'L', chest: '40-42"', waist: '34-36"', height: "6'0\"-6'2\"" },
    { size: 'XL', chest: '42-44"', waist: '36-38"', height: "6'2\"-6'4\"" },
    { size: 'XXL', chest: '44-46"', waist: '38-40"', height: "6'4\"-6'6\"" },
    { size: '3XL', chest: '46-48"', waist: '40-42"', height: "6'6\"-6'8\"" },
    { size: '4XL', chest: '48-50"', waist: '42-44"', height: "6'8\"-6'10\"" },
  ];
  
  const youthSizes = [
    { size: 'Youth S', chest: '26-28"', waist: '22-24"', height: "4'0\"-4'4\"" },
    { size: 'Youth M', chest: '28-30"', waist: '24-26"', height: "4'4\"-4'8\"" },
    { size: 'Youth L', chest: '30-32"', waist: '26-28"', height: "4'8\"-5'0\"" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Ruler className="h-4 w-4" />
          Size Chart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Kit Size Chart</DialogTitle>
          <DialogDescription>
            Reference sizing information for jerseys, shorts, and socks.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="adult">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="adult">Adult Sizes</TabsTrigger>
            <TabsTrigger value="youth">Youth Sizes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="adult" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Size</TableHead>
                  <TableHead>Chest</TableHead>
                  <TableHead>Waist</TableHead>
                  <TableHead>Height</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adultSizes.map((item) => (
                  <TableRow key={item.size}>
                    <TableCell className="font-medium">{item.size}</TableCell>
                    <TableCell>{item.chest}</TableCell>
                    <TableCell>{item.waist}</TableCell>
                    <TableCell>{item.height}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="youth" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Size</TableHead>
                  <TableHead>Chest</TableHead>
                  <TableHead>Waist</TableHead>
                  <TableHead>Height</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {youthSizes.map((item) => (
                  <TableRow key={item.size}>
                    <TableCell className="font-medium">{item.size}</TableCell>
                    <TableCell>{item.chest}</TableCell>
                    <TableCell>{item.waist}</TableCell>
                    <TableCell>{item.height}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
        
        <div className="text-sm text-muted-foreground mt-4">
          <p>How to measure:</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
            <li><strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.</li>
            <li><strong>Height:</strong> Measure from the top of your head to the bottom of your feet.</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
