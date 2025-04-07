
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SearchIcon, UserIcon, EditIcon, LockIcon } from 'lucide-react';

const AdminUsers = () => {
  // Sample data for users
  const users = [
    { 
      id: '1', 
      name: 'John Smith', 
      email: 'john@example.com',
      orders: 3,
      joined: '2025-02-10',
      role: 'customer'
    },
    { 
      id: '2', 
      name: 'Emma Wilson', 
      email: 'emma@example.com',
      orders: 2,
      joined: '2025-02-15',
      role: 'customer'
    },
    { 
      id: '3', 
      name: 'Alex Johnson', 
      email: 'alex@example.com',
      orders: 1,
      joined: '2025-03-01',
      role: 'customer'
    },
    { 
      id: '4', 
      name: 'Maria Garcia', 
      email: 'maria@example.com',
      orders: 4,
      joined: '2025-01-05',
      role: 'customer'
    },
    { 
      id: '5', 
      name: 'Admin User', 
      email: 'admin@example.com',
      orders: 0,
      joined: '2024-12-01',
      role: 'admin'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions.</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search users..." className="pl-9" />
            </div>
            
            <div>
              <Button>Add User</Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.orders}</TableCell>
                    <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="Edit User">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Reset Password">
                          <LockIcon className="h-4 w-4" />
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

export default AdminUsers;
