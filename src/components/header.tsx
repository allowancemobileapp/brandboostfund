'use client';

import { Rocket } from 'lucide-react';
import Link from 'next/link';

import { BrandRegistrationForm } from './brand-registration-form';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-brand-pink" />
            <span className="font-bold font-headline sm:inline-block">
              BrandBoost Fund
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <BrandRegistrationForm />
        </div>
      </div>
    </header>
  );
}
