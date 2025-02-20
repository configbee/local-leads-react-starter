export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  createdAt: string;
}

export type LeadFormData = Omit<Lead, 'id' | 'createdAt'>;