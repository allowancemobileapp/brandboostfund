
export type Brand = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  brandName: string;
  description: string;
  contact: string;
  socials?: string | null;
  website_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  generated_description?: string | null;
  logo_url?: string;
  website_prompt?: string | null;
};

export type Metrics = {
  id?: number;
  goal: number;
  raised: number;
  slots: number;
};
