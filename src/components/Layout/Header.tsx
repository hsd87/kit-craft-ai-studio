
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { UserIcon, LogOutIcon, GaugeIcon, ShirtIcon } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuth();
  
  // Helper to determine if a user is admin (for demo purposes)
  const isAdmin = user?.email?.endsWith('@admin.com') || false;
  
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">Profount.AI</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <span className="hidden sm:inline">{user.email}</span>
                  <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <UserIcon className="h-4 w-4" />
                    <span>My Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <ShirtIcon className="h-4 w-4" />
                    <span>Create New Kit</span>
                  </Link>
                </DropdownMenuItem>
                
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                        <GaugeIcon className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={signOut}
                  className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOutIcon className="h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
