
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SearchIcon, FilterIcon, EyeIcon, EditIcon, TrashIcon } from 'lucide-react';

const AdminKits = () => {
  // Sample data for kit designs
  const kitDesigns = [
    { 
      id: 'kit1', 
      club_name: 'Blue City FC', 
      user: 'John Smith',
      created_at: '2025-03-15',
      region: 'North America', 
      design_style: 'geometric'
    },
    { 
      id: 'kit2', 
      club_name: 'Eagles United', 
      user: 'Emma Wilson',
      created_at: '2025-03-14',
      region: 'Europe', 
      design_style: 'classic'
    },
    { 
      id: 'kit3', 
      club_name: 'Red Warriors', 
      user: 'Alex Johnson',
      created_at: '2025-03-12',
      region: 'South America', 
      design_style: 'minimalist'
    },
    { 
      id: 'kit4', 
      club_name: 'Green Valley', 
      user: 'Maria Garcia',
      created_at: '2025-03-11',
      region: 'Asia', 
      design_style: 'striped'
    },
    { 
      id: 'kit5', 
      club_name: 'Phoenix Athletics', 
      user: 'David Chen',
      created_at: '2025-03-10',
      region: 'Australia/Oceania', 
      design_style: 'gradient'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kit Designs</h1>
        <p className="text-muted-foreground">Manage customer kit designs and templates.</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search designs..." className="pl-9" />
            </div>
            
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    <span>Filter Style</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Styles</SelectItem>
                  <SelectItem value="geometric">Geometric</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="striped">Striped</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>New Template</Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Club Name</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Style</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kitDesigns.map((kit) => (
                  <TableRow key={kit.id}>
                    <TableCell>
                      <div className="h-10 w-10 bg-slate-100 rounded flex items-center justify-center text-xs">
                        Kit
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{kit.club_name}</TableCell>
                    <TableCell>{kit.user}</TableCell>
                    <TableCell>{new Date(kit.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{kit.region}</TableCell>
                    <TableCell>
                      <span className="capitalize">{kit.design_style}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="View Kit">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit Kit">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete Kit">
                          <TrashIcon className="h-4 w-4" />
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

export default AdminKits;
