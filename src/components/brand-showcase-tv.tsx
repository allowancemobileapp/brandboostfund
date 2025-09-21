
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Brand } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUpRight, Hourglass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StaticNoise } from '@/components/static-noise';

export function BrandShowcaseTV({ brands }: { brands: Brand[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const handleNext = () => {
    if (brands.length > 1) {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
        setIsChanging(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (brands.length <= 1) return;
    const interval = setInterval(handleNext, 7000); // Change channel every 7 seconds
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands.length]);

  const currentBrand = brands[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Antenna */}
      <div className="relative h-8 w-full">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-white/10" />
        <div className="absolute bottom-3 left-1/2 -translate-x-full w-20 h-1 bg-white/10 -rotate-45 origin-bottom-right rounded-full" />
        <div className="absolute bottom-3 left-1/2 w-20 h-1 bg-white/10 rotate-45 origin-bottom-left rounded-full" />
      </div>
      <div 
        className="bg-[#1a1a1a] p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/10"
        style={{
          boxShadow: '0 0 5px hsl(var(--accent)/0.2), 0 0 20px hsl(var(--accent)/0.1), 0 0 40px hsl(var(--accent)/0.05)',
        }}
      >
        <div 
          className="aspect-[4/3] w-full bg-black rounded-lg overflow-hidden relative cursor-pointer group border-2 border-black"
          onClick={handleNext}
        >
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            {isChanging && <StaticNoise />}
            
            <div className={cn("transition-opacity duration-150 w-full h-full", isChanging ? 'opacity-0' : 'opacity-100')}>
              {brands.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground/70 animate-pulse">
                  <Hourglass className="w-16 h-16 mb-4" />
                  <h3 className="text-2xl font-semibold tracking-tight font-headline text-muted-foreground">
                    Coming Soon!
                  </h3>
                  <p className="mt-2">
                    Approved brands will be showcased here.
                  </p>
                </div>
              ) : (
                <Card key={currentBrand.id} className="flex flex-col w-full h-full bg-card/80 backdrop-blur-sm text-center border-0 rounded-none">
                  <CardHeader className="flex-col gap-4 items-center pt-8">
                    {currentBrand.logo_url && (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={`https://picsum.photos/seed/${currentBrand.logo_url}/100/100`}
                          alt={`${currentBrand.brand_name} logo`}
                          width={64}
                          height={64}
                          className="rounded-lg object-cover border"
                          data-ai-hint="company logo"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="font-headline text-2xl">{currentBrand.brand_name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-center justify-center">
                    <CardDescription className="px-4 text-base">
                      {currentBrand.generated_description || currentBrand.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="px-8 pb-8">
                    {currentBrand.website_url && (
                      <Button asChild variant="outline" className="w-full bg-background/50">
                        <Link href={currentBrand.website_url} target="_blank" rel="noopener noreferrer">
                          Visit Website <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
          <div className="absolute inset-0 rounded-lg" style={{boxShadow: 'inset 0 0 20px 5px rgba(0,0,0,0.8)'}} />
          <div className="absolute -bottom-1 -right-1 text-xs font-mono text-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {brands.length > 1 ? '[ CLICK TO CHANGE CHANNEL ]' : '[ OFFLINE ]'}
          </div>
        </div>
      </div>
      <div className="h-2 w-24 bg-[#1a1a1a] mx-auto rounded-b-sm border-x border-b border-white/10" />
      <div className="h-4 w-48 bg-[#1a1a1a] mx-auto rounded-b-md border-x border-b border-white/10" />
    </div>
  );
}
