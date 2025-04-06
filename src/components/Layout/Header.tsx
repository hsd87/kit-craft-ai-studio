
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const { user, signOut } = useAuth();
  
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">Profount.AI</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </>
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
