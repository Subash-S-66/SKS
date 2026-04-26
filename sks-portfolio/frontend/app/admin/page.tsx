"use client"
import { useEffect, useState } from 'react';
import { Users, Briefcase, MessageSquare, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const [enqRes, srvRes, projRes] = await Promise.all([
          fetch('/api/enquiries', { headers }),
          fetch('/api/services', { headers }),
          fetch('/api/projects', { headers })
        ]);

        const enquiries = await enqRes.json();
        const services = await srvRes.json();
        const projects = await projRes.json();

        setStats({
          totalEnquiries: enquiries.length,
          newEnquiries: enquiries.filter((e: any) => e.status === 'New').length,
          activeServices: services.length,
          totalProjects: projects.length
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="text-white/50">Loading dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Enquiries" value={stats.totalEnquiries} icon={Users} color="text-blue-400" />
        <StatCard title="New Enquiries" value={stats.newEnquiries} icon={MessageSquare} color="text-green-400" />
        <StatCard title="Active Services" value={stats.activeServices} icon={Activity} color="text-purple-400" />
        <StatCard title="Total Projects" value={stats.totalProjects} icon={Briefcase} color="text-[var(--primary-accent)]" />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/" target="_blank" className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm">View Live Site</a>
          <a href="/admin/enquiries" className="px-4 py-2 bg-[var(--primary-accent)]/20 text-[var(--primary-accent)] rounded-lg hover:bg-[var(--primary-accent)]/30 transition-colors text-sm">Review Enquiries</a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
      <div className={`p-4 rounded-xl bg-white/5 ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="text-white/60 text-sm mb-1">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}
