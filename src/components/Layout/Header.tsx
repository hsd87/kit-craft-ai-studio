
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AuthModal } from '../Auth/AuthModal';

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-display font-bold text-primary">
            Profount<span className="text-secondary">.AI</span>
          </h1>
          <span className="ml-2 px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md">
            Beta
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setShowAuthModal(true)}
            className="font-medium"
          >
            Sign In
          </Button>
          
          <Button onClick={() => setShowAuthModal(true)} className="font-medium">
            Sign Up
          </Button>
        </div>
      </div>
      
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </header>
  );
}
