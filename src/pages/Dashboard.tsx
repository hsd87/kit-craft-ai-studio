
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserKitDesigns } from '@/services/kitService';
import { KitDesign } from '@/components/KitDesigner/types';
import { toast } from 'sonner';
import { Undo2Icon, PackageIcon, UserIcon } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [designs, setDesigns] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('designs');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDesigns = async () => {
      try {
        setIsLoading(true);
        if (user) {
          const kitDesigns = await getUserKitDesigns();
          setDesigns(kitDesigns);
          
          // In a full implementation, we would load orders here too
          // setOrders(await getUserOrders());
          setOrders([]); // Placeholder for now
        }
      } catch (error) {
        console.error('Error loading user designs:', error);
        toast.error('Failed to load your designs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDesigns();
  }, [user]);

  const handleEditDesign = (designId: string) => {
    navigate(`/?edit=${designId}`);
  };

  const handleNewDesign = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">My Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your kit designs and orders
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="designs" className="flex items-center gap-2">
                <Undo2Icon size={16} />
                <span>My Designs</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <PackageIcon size={16} />
                <span>My Orders</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <UserIcon size={16} />
                <span>Account</span>
              </TabsTrigger>
            </TabsList>
            
            <Button onClick={handleNewDesign}>Create New Kit</Button>
          </div>
          
          <TabsContent value="designs" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : designs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((design) => (
                  <Card key={design.id} className="overflow-hidden">
                    <div className="aspect-[4/3] relative bg-gray-100">
                      {design.front_image_url ? (
                        <img 
                          src={design.front_image_url} 
                          alt={design.club_name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                          No Preview
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle>{design.club_name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{design.kit_type?.join(", ")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span>{design.quantity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{new Date(design.created_at).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => handleEditDesign(design.id)}
                      >
                        Edit Design
                      </Button>
                      <Button>Order Again</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't created any designs yet.</p>
                  <Button onClick={handleNewDesign}>Create Your First Kit</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Order #{order.id.substring(0, 8)}</h3>
                          <p className="text-muted-foreground text-sm">
                            Placed on {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
                            {order.status}
                          </div>
                          <p className="mt-1 font-medium">${order.total_price}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">You don't have any orders yet.</p>
                  <Button onClick={handleNewDesign}>Create a Kit Design</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{user?.email}</p>
                </div>
                {user?.user_metadata && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p>{user.user_metadata.full_name || 'Not provided'}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline">Update Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Profount.AI - Custom Sports Kit Design
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
