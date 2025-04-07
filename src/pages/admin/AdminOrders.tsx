
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { SearchIcon, FilterIcon, EyeIcon, EditIcon, ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

const AdminOrders = () => {
  const [sortColumn, setSortColumn] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Sample data for orders
  const orders = [
    { 
      id: '1fb7d2', 
      created_at: '2025-03-15', 
      customer: 'John Smith', 
      email: 'john@example.com',
      total: 450, 
      status: 'Processing' 
    },
    { 
      id: '5c38a9', 
      created_at: '2025-03-14', 
      customer: 'Emma Wilson', 
      email: 'emma@example.com',
      total: 380, 
      status: 'Shipped' 
    },
    { 
      id: '8f92e1', 
      created_at: '2025-03-12', 
      customer: 'Alex Johnson', 
      email: 'alex@example.com',
      total: 225, 
      status: 'Completed' 
    },
    { 
      id: '3d7b6c', 
      created_at: '2025-03-11', 
      customer: 'Maria Garcia', 
      email: 'maria@example.com',
      total: 520, 
      status: 'Processing' 
    },
    { 
      id: '7g35h8', 
      created_at: '2025-03-10', 
      customer: 'David Chen', 
      email: 'david@example.com',
      total: 345, 
      status: 'Completed' 
    }
  ];
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortColumn === 'total') {
      return sortDirection === 'asc' 
        ? a.total - b.total 
        : b.total - a.total;
    }
    
    if (sortColumn === 'created_at') {
      return sortDirection === 'asc' 
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime() 
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    
    // Default string sort
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });
  
  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUpIcon className="ml-1 h-4 w-4" /> 
      : <ArrowDownIcon className="ml-1 h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage and track customer orders.</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search orders..." className="pl-9" />
            </div>
            
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    <span>Filter Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>Export</Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      Order ID
                      <SortIcon column="id" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('created_at')}
                  >
                    <div className="flex items-center">
                      Date
                      <SortIcon column="created_at" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('customer')}
                  >
                    <div className="flex items-center">
                      Customer
                      <SortIcon column="customer" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('total')}
                  >
                    <div className="flex items-center">
                      Total
                      <SortIcon column="total" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      <SortIcon column="status" />
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">
                      <div>{order.customer}</div>
                      <div className="text-muted-foreground text-xs">{order.email}</div>
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        order.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Shipped' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="View Order">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit Order">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
