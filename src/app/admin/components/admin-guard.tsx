'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, EyeOff, Eye } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ADMIN_CODE = '4190';
const AUTH_KEY = 'bb-admin-auth';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check session storage on component mount
    const storedAuth = sessionStorage.getItem(AUTH_KEY);
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleVerify = () => {
    if (code === ADMIN_CODE) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      toast({
        title: 'Access Granted',
        description: 'Welcome to the admin dashboard.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'The PIN you entered is incorrect.',
      });
      setCode('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleVerify();
    }
  };
  
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="bg-background min-h-screen">
      <Dialog open={!isAuthenticated} onOpenChange={() => {}}>
        <DialogContent
          className="sm:max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
              <ShieldAlert className="text-amber-500 size-7" />
              Admin Access Required
            </DialogTitle>
            <DialogDescription>
              Please enter the 4-digit admin PIN to access the dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              maxLength={4}
              placeholder="****"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyPress}
              className="text-center font-mono text-2xl tracking-[0.5em] h-14 pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={toggleShowPassword}
              aria-label={showPassword ? 'Hide PIN' : 'Show PIN'}
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </Button>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleVerify}
              disabled={code.length !== 4}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Verify & Enter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
