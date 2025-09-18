import type { Brand } from '@/lib/types';
import { BrandShowcaseTV } from '@/components/brand-showcase-tv';

export function ApprovedBrands({ brands }: { brands: Brand[] }) {
  return (
    <div className="flex items-center justify-center">
      <BrandShowcaseTV brands={brands} />
    </div>
  );
}
