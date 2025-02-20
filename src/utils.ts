import { Lead, LeadFormData } from './types';

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function createLead(data: LeadFormData): Lead {
  return {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
}

export function saveLeads(leads: Lead[]): void {
  localStorage.setItem('leads', JSON.stringify(leads));
}

export function getLeads(): Lead[] {
  const leads = localStorage.getItem('leads');
  return leads ? JSON.parse(leads) : [];
}

export function exportLeadsToCSV(leads: Lead[]): void {
  const headers = ['Name', 'Email', 'Phone', 'Company', 'Notes', 'Created At'];
  const csvContent = [
    headers.join(','),
    ...leads.map(lead => [
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      `"${lead.notes.replace(/"/g, '""')}"`,
      new Date(lead.createdAt).toLocaleString()
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}

export function importLeadsFromCSV(file: File): Promise<Lead[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rows = text.split('\n').slice(1); // Skip header row
        const leads: Lead[] = rows.filter(row => row.trim()).map(row => {
          const [name, email, phone, company, notes] = row.split(',').map(cell => 
            cell.replace(/^"(.*)"$/, '$1').replace(/""/g, '"')
          );
          return createLead({ name, email, phone, company, notes });
        });
        resolve(leads);
      } catch (error) {
        reject(new Error('Invalid CSV format'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}