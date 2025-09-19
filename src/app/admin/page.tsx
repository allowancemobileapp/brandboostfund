import { getBrands } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BrandActions } from './components/brand-actions';
import type { Brand } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function AdminPage() {
  const brands = await getBrands();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage brand registrations and content.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Brand Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Registrant</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Socials</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No brands registered yet.
                </TableCell>
              </TableRow>
            )}
            {brands.map((brand: Brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.brandName}</TableCell>
                <TableCell className="max-w-xs truncate">{brand.description}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.contact}</TableCell>
                <TableCell>{brand.socials || 'N/A'}</TableCell>
                <TableCell>
                  <Badge 
                    variant={brand.status === 'approved' ? 'default' : brand.status === 'pending' ? 'secondary' : 'destructive'}
                    className={brand.status === 'approved' ? 'bg-green-700/20 text-green-400 border-green-700/30' : ''}
                  >
                    {brand.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <BrandActions brand={brand} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
