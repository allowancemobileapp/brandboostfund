
export type Brand = {
  id: string;
  name: string;
  brandName: string;
  description: string;
  contact: string;
  socials?: string | null;
  websiteUrl: string | null;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  generatedDescription?: string | null;
  logoUrl?: string;
  websitePrompt?: string | null;
};

export type Metrics = {
  goal: number;
  raised: number;
  slots: number;
};
