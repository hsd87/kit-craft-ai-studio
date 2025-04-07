
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const pricingSchema = z.object({
  jerseyPrice: z.string().min(1),
  shortsPrice: z.string().min(1),
  socksPrice: z.string().min(1),
  logoPrice: z.string().min(1),
  aiPrice: z.string().min(1),
  nameNumberPrice: z.string().min(1),
  discountTier1: z.string().min(1),
  discountTier2: z.string().min(1),
});

const AdminSettings = () => {
  const form = useForm<z.infer<typeof pricingSchema>>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      jerseyPrice: "30",
      shortsPrice: "15",
      socksPrice: "8",
      logoPrice: "5",
      aiPrice: "5",
      nameNumberPrice: "2",
      discountTier1: "0.90",
      discountTier2: "0.85",
    },
  });
  
  function onSubmit(values: z.infer<typeof pricingSchema>) {
    console.log(values);
    toast.success("Settings updated successfully!");
    // In a real app, save these to Supabase here
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage application settings and configurations.</p>
      </div>
      
      <Tabs defaultValue="pricing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Configuration</CardTitle>
              <CardDescription>
                Manage base prices and discount tiers for the kit designer.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Base Pricing</h3>
                      
                      <FormField
                        control={form.control}
                        name="jerseyPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jersey Price ($)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shortsPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shorts Price ($)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="socksPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Socks Price ($)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Additional Fees</h3>
                      
                      <FormField
                        control={form.control}
                        name="logoPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo Price (per logo, $)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="aiPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AI Enhancement Fee ($)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="nameNumberPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name & Number Fee (per player, $)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Discount Tiers</h3>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="discountTier1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tier 1 Discount (10+ items, multiplier)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" max="1" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="discountTier2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tier 2 Discount (20+ items, multiplier)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" max="1" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure general application settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <div className="font-medium">Enable AI Generation</div>
                    <div className="text-sm text-muted-foreground">
                      Allow users to use AI to generate kit designs
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <div className="font-medium">Public Access</div>
                    <div className="text-sm text-muted-foreground">
                      Allow non-registered users to design kits
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <div className="font-medium">Maintenance Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Put the site in maintenance mode temporarily
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <h3 className="text-lg font-medium">API Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ideogram API Key</label>
                    <Input value="••••••••••••••••••••••" type="password" />
                    <p className="text-xs text-muted-foreground">Last updated: 2025-03-01</p>
                  </div>
                  <Button>Regenerate API Key</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
