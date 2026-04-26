/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { LogOut, LayoutDashboard, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  const handleLogout = async () => {
    // In a real app, you'd want an API route to clear the httpOnly cookie
    // For now, we simulate clearing it by calling a logout route or relying on browser deletion.
    // Assuming simple client redirect (token will need clearing via API)
    await fetch("/api/auth/logout", { method: "POST" }).catch(()=>console.log("Mock logout"));
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="border-b border-white/10 bg-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-brand-purple" />
          <h1 className="font-bold">SKS Admin</h1>
        </div>
        <button onClick={handleLogout} className="text-sm text-foreground/60 hover:text-white flex items-center gap-2 transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Quick Stats Placeholder */}
          <div className="glass-card p-6 rounded-2xl col-span-1 lg:col-span-3">
            <h2 className="text-lg font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                 <p className="text-sm text-foreground/60">Total Messages</p>
                 <p className="text-2xl font-bold">{messages.length}</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                 <p className="text-sm text-foreground/60">Active Services</p>
                 <p className="text-2xl font-bold">4</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                 <p className="text-sm text-foreground/60">System Status</p>
                 <p className="text-2xl font-bold text-green-400">Online</p>
               </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="glass-card p-6 rounded-2xl col-span-1 lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-lg font-semibold flex items-center gap-2">
                 <MessageSquare className="w-5 h-5" /> Recent Inquiries
               </h2>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8 text-foreground/50">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8 text-foreground/50">No messages yet.</div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{msg.name}</h3>
                        <a href={`mailto:${msg.email}`} className="text-sm text-brand-blue hover:underline">{msg.email}</a>
                      </div>
                      <span className="text-xs text-foreground/40">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-foreground/80 mt-2 bg-black/20 p-3 rounded-lg border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
