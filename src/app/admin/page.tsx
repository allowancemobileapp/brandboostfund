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
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Original Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand: Brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.name}</TableCell>
                <TableCell>{brand.contact}</TableCell>
                <TableCell>
                  <Badge 
                    variant={brand.status === 'approved' ? 'default' : brand.status === 'pending' ? 'secondary' : 'destructive'}
                    className={brand.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {brand.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate hidden md:table-cell">{brand.description}</TableCell>
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
