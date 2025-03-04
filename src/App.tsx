import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import { Download, Upload, Plus, Trash2, Users, Eye, AlertCircle } from 'lucide-react';
import { Lead, LeadFormData } from './types';
import { createLead, saveLeads, getLeads, exportLeadsToCSV, importLeadsFromCSV } from './utils';
import {
  useCbStatus,
  useCbFlags,
  useCbNumbers,
  useCbJsons,
  useCbTexts,
  useCbOperations
} from 'configbee-react';

function getTargetingProps() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmCampaign = urlParams.get('utm_campaign')
  if (utmCampaign) {
    return { "utm_campaign":  utmCampaign}
  } else {
    return undefined
  }
}


function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  
  const {show_import, show_export, show_hero} = useCbFlags();
  const cbStatus = useCbStatus();
  const {app_title, hero_title, hero_description} = useCbTexts();
  const cbOperations = useCbOperations();


  useEffect(() => {
    handleTargeting()
    setLeads(getLeads());
  }, []);

  useEffect(() => {
    handleTargeting()
  }, [window.location.search, cbStatus])

  const handleTargeting = () => {
    const targetProperties = getTargetingProps()
    if(targetProperties && cbStatus!=undefined){
      cbOperations.setTargetProperties(targetProperties)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = createLead(formData);
    const updatedLeads = [...leads, newLead];
    setLeads(updatedLeads);
    saveLeads(updatedLeads);
    setFormData({ name: '', email: '', phone: '', company: '', notes: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setLeadToDelete(id);
  };

  const confirmDelete = () => {
    if (leadToDelete) {
      const updatedLeads = leads.filter(lead => lead.id !== leadToDelete);
      setLeads(updatedLeads);
      saveLeads(updatedLeads);
      setLeadToDelete(null);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedLeads = await importLeadsFromCSV(file);
      const updatedLeads = [...leads, ...importedLeads];
      setLeads(updatedLeads);
      saveLeads(updatedLeads);
    } catch (error) {
      alert('Error importing leads. Please check the file format.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Helmet>
          <title>{app_title || "Lead Manager"}</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        {show_hero && (
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-3 rounded-full">
              <Users size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-4">{hero_title || "Lead Manager"}</h1>
          <p className="text-center text-white/80 max-w-2xl mx-auto">
            {hero_description || "Efficiently manage and track your leads with our intuitive lead management system. Import, export, and organize your leads all in one place."}
          </p>
        </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{app_title || "Lead Manager"}</h1>
            <div className="flex gap-4">
              {show_export && (
                <button
                  onClick={() => exportLeadsToCSV(leads)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Download size={18} /> Export
                </button>
              )}
              {show_import && (
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                  <Upload size={18} /> Import
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              )}
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus size={18} /> Add Lead
              </button>
            </div>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Lead
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map(lead => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {leadToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg w-full max-w-md p-6">
                <div className="flex items-center justify-center mb-4 text-red-600">
                  <AlertCircle size={48} />
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">Confirm Delete</h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete this lead? This action cannot be undone.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setLeadToDelete(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}

export default App;