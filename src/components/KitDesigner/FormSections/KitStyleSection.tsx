
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { KitDesign } from '../types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface KitStyleSectionProps {
  design: KitDesign;
  onChange: (field: keyof KitDesign, value: any) => void;
  availableCollarStyles?: string[];
  availableSleevePatterns?: string[];
}

export function KitStyleSection({ 
  design, 
  onChange,
  availableCollarStyles = ['v-neck', 'crew-neck', 'collar', 'collar-without-buttons'],
  availableSleevePatterns = ['normal', 'raglan', 'unique'] 
}: KitStyleSectionProps) {
  
  // Helper function to convert option values to readable names
  const getReadableName = (value: string) => {
    return value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  
  return (
    <AccordionItem value="style" className="border rounded-lg">
      <AccordionTrigger className="px-4 py-2">Design & Style</AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
        {/* Collar Style */}
        <div>
          <FormField
            name="collarStyle"
            render={() => (
              <FormItem>
                <FormLabel>Collar Style</FormLabel>
                <FormControl>
                  <Select 
                    value={design.collarStyle}
                    onValueChange={(value: string) => onChange('collarStyle', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select collar style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {availableCollarStyles.map((style) => (
                          <SelectItem key={style} value={style}>
                            {getReadableName(style)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Design Style */}
        <div>
          <FormField
            name="designStyle"
            render={() => (
              <FormItem>
                <FormLabel>Design Style</FormLabel>
                <FormControl>
                  <Select 
                    value={design.designStyle}
                    onValueChange={(value: string) => onChange('designStyle', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select design style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="geometric">Geometric</SelectItem>
                        <SelectItem value="stripes">Stripes</SelectItem>
                        <SelectItem value="gradients">Gradients</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="retro">Retro</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Sleeve Pattern */}
        <div>
          <FormField
            name="sleevePattern"
            render={() => (
              <FormItem>
                <FormLabel>Sleeve Pattern</FormLabel>
                <FormControl>
                  <Select 
                    value={design.sleevePattern}
                    onValueChange={(value: string) => onChange('sleevePattern', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select sleeve pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {availableSleevePatterns.map((pattern) => (
                          <SelectItem key={pattern} value={pattern}>
                            {getReadableName(pattern)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Fabric Type */}
        <div>
          <FormField
            name="fabricType"
            render={() => (
              <FormItem>
                <FormLabel>Fabric Type</FormLabel>
                <FormControl>
                  <Select 
                    value={design.fabricType}
                    onValueChange={(value: string) => onChange('fabricType', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select fabric type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="dry-fit-polyester">Dry Fit Polyester</SelectItem>
                        <SelectItem value="mesh-polyester">Mesh Polyester</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Making Type */}
        <div>
          <FormField
            name="makingType"
            render={() => (
              <FormItem>
                <FormLabel>Making Type</FormLabel>
                <FormControl>
                  <Select 
                    value={design.makingType}
                    onValueChange={(value: string) => onChange('makingType', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select making type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="sublimation">Sublimation</SelectItem>
                        <SelectItem value="cut-sew">Cut & Sew</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Custom Pattern */}
        {design.designStyle === 'custom' && (
          <div>
            <FormField
              name="customPattern"
              render={() => (
                <FormItem>
                  <FormLabel>Custom Pattern Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your custom pattern"
                      value={design.customPattern}
                      onChange={(e) => onChange('customPattern', e.target.value)}
                      className="h-24"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
