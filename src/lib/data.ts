import type { Brand, Metrics } from '@/lib/types';

// This is a mock database. In a real application, you'd use a real database.
// Data will reset on server restart.

let metrics: Metrics = {
  goal: 1000000,
  raised: 0,
  slots: 100,
};

let brands: Brand[] = [];

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

  // When a brand is approved, update metrics
  if (updates.status === 'approved' && brands[brandIndex].status !== 'approved') {
    metrics.raised += 10000;
    metrics.slots -= 1;
  }
  
  return Promise.resolve(brands[brandIndex]);
};
