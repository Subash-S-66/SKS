"use client"
import { useEffect, useState } from 'react';

export default function PortfolioManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects', { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } })
      .then(res => res.json())
      .then(data => { setProjects(data); setLoading(false); });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Portfolio Manager</h1>
        <button className="px-4 py-2 bg-[var(--primary-accent)] text-black font-bold rounded-lg">Add Project</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-white/60 text-sm mb-4">{project.shortDescription}</p>
            <div className="flex gap-2">
              <button className="text-sm px-3 py-1 bg-white/10 rounded hover:bg-white/20 transition">Edit</button>
              <button className="text-sm px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
