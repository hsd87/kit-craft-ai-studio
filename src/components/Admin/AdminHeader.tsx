
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, BellIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AdminHeader = () => {
  const { user } = useAuth();
  const [notifications] = useState(3); // Example notification count
  
  return (
    <header className="bg-white border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="w-96">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search..." 
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="relative"
          >
            <BellIcon className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
