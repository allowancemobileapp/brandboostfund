import type { Brand, Metrics } from '@/lib/types';

// This is a mock database. In a real application, you'd use a real database.
// Data will reset on server restart.

let metrics: Metrics = {
  goal: 100000,
  raised: 25000,
  slots: 10,
};

let brands: Brand[] = [
  {
    id: '1',
    name: 'QuantumLeap',
    description: 'Pioneering quantum computing solutions for a new era of technology.',
    contact: 'contact@quantumleap.com',
    websiteUrl: 'https://example.com',
    status: 'approved',
    featured: true,
    generatedDescription: "Harness the power of tomorrow with QuantumLeap, where we turn quantum impossibilities into today's realities. Experience computation at the speed of light.",
    logoUrl: '1',
  },
  {
    id: '2',
    name: 'EcoBloom',
    description: 'Sustainable and ethically sourced products for a greener lifestyle.',
    contact: 'hello@ecobloom.com',
    websiteUrl: 'https://example.com',
    status: 'approved',
    featured: true,
    generatedDescription: 'Live green, live better. EcoBloom offers a curated collection of beautiful, sustainable products that are kind to you and the planet.',
    logoUrl: '2',
  },
  {
    id: '3',
    name: 'Aetheric Goods',
    description: 'Luxury handcrafted leather goods with a timeless design.',
    contact: 'support@aetheric.com',
    websiteUrl: 'https://example.com',
    status: 'approved',
    featured: false,
    generatedDescription: 'Aetheric Goods: where tradition meets elegance. Discover our collection of handcrafted leather goods, designed to last a lifetime and beyond.',
    logoUrl: '3',
  },
  {
    id: '4',
    name: 'SynthWave Snacks',
    description: 'Retro-futuristic snacks that taste like the 80s.',
    contact: 'orders@synthwave.com',
    status: 'pending',
    websiteUrl: null,
    featured: false,
    logoUrl: '4',
  }
];

export const getMetrics = async (): Promise<Metrics> => {
  return Promise.resolve(metrics);
};

export const updateMetrics = async (newMetrics: Partial<Metrics>): Promise<Metrics> => {
  metrics = { ...metrics, ...newMetrics };
  return Promise.resolve(metrics);
};

export const getBrands = async (): Promise<Brand[]> => {
  return Promise.resolve(brands);
};

export const getBrandById = async (id: string): Promise<Brand | undefined> => {
    return Promise.resolve(brands.find(b => b.id === id));
}

export const addBrand = async (brandData: Omit<Brand, 'id' | 'status' | 'websiteUrl' | 'featured' | 'generatedDescription' | 'logoUrl'>): Promise<Brand> => {
  const newBrand: Brand = {
    ...brandData,
    id: String(brands.length + 1),
    status: 'pending',
    websiteUrl: null,
    featured: false,
    logoUrl: String(brands.length + 1),
  };
  brands.push(newBrand);
  return Promise.resolve(newBrand);
};

export const updateBrand = async (brandId: string, updates: Partial<Brand>): Promise<Brand | undefined> => {
  const brandIndex = brands.findIndex(b => b.id === brandId);
  if (brandIndex === -1) {
    return Promise.resolve(undefined);
  }
  brands[brandIndex] = { ...brands[brandIndex], ...updates };
  return Promise.resolve(brands[brandIndex]);
};
