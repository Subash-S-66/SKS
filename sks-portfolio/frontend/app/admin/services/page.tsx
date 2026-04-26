"use client"
import { useEffect, useState } from 'react';

export default function ServicesManager() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services', { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } })
      .then(res => res.json())
      .then(data => { setServices(data); setLoading(false); });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Services Manager</h1>
        <button className="px-4 py-2 bg-[var(--primary-accent)] text-black font-bold rounded-lg">Add Service</button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-medium text-white/60">Name</th>
              <th className="p-4 font-medium text-white/60">Short Description</th>
              <th className="p-4 font-medium text-white/60">Visible</th>
              <th className="p-4 font-medium text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">{service.name}</td>
                <td className="p-4">{service.shortDescription}</td>
                <td className="p-4">{service.visible ? 'Yes' : 'No'}</td>
                <td className="p-4">
                  <button className="text-[var(--primary-accent)] hover:underline mr-4">Edit</button>
                  <button className="text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
