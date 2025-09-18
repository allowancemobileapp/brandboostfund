export type Brand = {
  id: string;
  name: string;
  description: string;
  contact: string;
  websiteUrl: string | null;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  generatedDescription?: string | null;
  logoUrl?: string;
};

export type Metrics = {
  goal: number;
  raised: number;
  slots: number;
};
