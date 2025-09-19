
export type Brand = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  brand_name: string;
  description: string;
  contact: string;
  socials?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  website_url: string | null;
  generated_description?: string | null;
  website_prompt?: string | null;
  logo_url?: string;
};

export type Metrics = {
  id?: number;
  goal: number;
  raised: number;
  slots: number;
};
