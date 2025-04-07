
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ShirtIcon,
  PackageIcon,
  UsersIcon,
  DollarSignIcon
} from 'lucide-react';

const AdminDashboard = () => {
  // Sample data for dashboard metrics
  const metrics = [
    { 
      title: 'Total Sales', 
      value: '$12,450', 
      change: '+12%', 
      trend: 'up', 
      icon: DollarSignIcon 
    },
    { 
      title: 'Kit Designs', 
      value: '124', 
      change: '+8%', 
      trend: 'up', 
      icon: ShirtIcon 
    },
    { 
      title: 'Orders', 
      value: '86', 
      change: '+16%', 
      trend: 'up', 
      icon: PackageIcon 
    },
    { 
      title: 'Users', 
      value: '210', 
      change: '-3%', 
      trend: 'down', 
      icon: UsersIcon 
    }
  ];

  // Sample data for recent orders
  const recentOrders = [
    { id: '1fb7d2', customer: 'John Smith', total: '$450', status: 'Processing' },
    { id: '5c38a9', customer: 'Emma Wilson', total: '$380', status: 'Shipped' },
    { id: '8f92e1', customer: 'Alex Johnson', total: '$225', status: 'Completed' },
    { id: '3d7b6c', customer: 'Maria Garcia', total: '$520', status: 'Processing' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your business metrics and recent activity.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`flex items-center text-xs ${
                metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                )}
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground">
                <div>Order ID</div>
                <div>Customer</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-4 py-3 text-sm">
                    <div>#{order.id}</div>
                    <div>{order.customer}</div>
                    <div>{order.total}</div>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        order.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Shipped' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <a href="/admin/orders" className="text-sm text-blue-500 hover:underline">
              View all orders
            </a>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Kit Designs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground">
                <div>Design</div>
                <div>Orders</div>
                <div>Revenue</div>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-3 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-100 rounded"></div>
                    <span>Blue Strike</span>
                  </div>
                  <div>18</div>
                  <div>$3,240</div>
                </div>
                <div className="grid grid-cols-3 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-red-100 rounded"></div>
                    <span>Red Thunder</span>
                  </div>
                  <div>12</div>
                  <div>$2,160</div>
                </div>
                <div className="grid grid-cols-3 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-green-100 rounded"></div>
                    <span>Green Wave</span>
                  </div>
                  <div>10</div>
                  <div>$1,800</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <a href="/admin/kits" className="text-sm text-blue-500 hover:underline">
              View all designs
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
