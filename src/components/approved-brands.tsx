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
import { ArrowUpRight } from 'lucide-react';

export function ApprovedBrands({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
        <h3 className="text-2xl font-semibold tracking-tight">
          Portfolio is Growing
        </h3>
        <p className="mt-2 text-muted-foreground">
          Approved brands will be showcased here. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <Card key={brand.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
          <CardHeader className="flex-row gap-4 items-start">
            {brand.logoUrl && (
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={`https://picsum.photos/seed/${brand.logoUrl}/100/100`}
                  alt={`${brand.name} logo`}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover border"
                  data-ai-hint="company logo"
                />
              </div>
            )}
            <div>
              <CardTitle className="font-headline text-xl">{brand.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription>{brand.generatedDescription || brand.description}</CardDescription>
          </CardContent>
          <CardFooter>
            {brand.websiteUrl && (
              <Button asChild variant="outline" className="w-full">
                <Link href={brand.websiteUrl} target="_blank" rel="noopener noreferrer">
                  Visit Website <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
