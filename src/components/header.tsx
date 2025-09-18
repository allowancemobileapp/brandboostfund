'use client';

import Link from 'next/link';
import { BrandRegistrationForm } from './brand-registration-form';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline sm:inline-block">
              100 Websites Fundraiser
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/#metrics" className="text-muted-foreground/80 hover:text-foreground transition-colors">Metrics</Link>
            <Link href="/#brands" className="text-muted-foreground/80 hover:text-foreground transition-colors">Showcase</Link>
            <Link href="/faq" className="text-muted-foreground/80 hover:text-foreground transition-colors">FAQ</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <BrandRegistrationForm />
        </div>
      </div>
    </header>
  );
}
