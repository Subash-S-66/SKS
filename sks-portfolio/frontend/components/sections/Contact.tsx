"use client"
import { useState } from 'react';

export default function Contact({ settings, services }: { settings: any, services: any[] }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', serviceInterestedIn: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
      setFormData({ name: '', email: '', message: '', serviceInterestedIn: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#05070d] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s Talk</h2>
            <div className="w-24 h-1 bg-[var(--primary-accent)] rounded-full mb-8"></div>
            <p className="text-lg text-white/70 mb-12">Ready to transform your digital presence? Reach out to us today.</p>

            <div className="space-y-6">
              {settings?.contactEmail && (
                <div className="flex items-center gap-4 text-white/80">
                  <span className="text-[var(--primary-accent)]">Email:</span> {settings.contactEmail}
                </div>
              )}
              {settings?.contactPhone && (
                <div className="flex items-center gap-4 text-white/80">
                  <span className="text-[var(--primary-accent)]">Phone:</span> {settings.contactPhone}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-white/70">We&apos;ll get back to you within 24 hours.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-[var(--primary-accent)] hover:underline">Send another message</button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary-accent)] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary-accent)] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Service of Interest</label>
                    <select value={formData.serviceInterestedIn} onChange={e => setFormData({...formData, serviceInterestedIn: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary-accent)] transition-colors appearance-none">
                      <option value="">Select a service</option>
                      {services?.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary-accent)] transition-colors resize-none"></textarea>
                  </div>
                  <button disabled={status === 'loading'} type="submit" className="w-full bg-[var(--primary-accent)] text-black font-bold py-4 rounded-lg hover:bg-opacity-90 transition-opacity disabled:opacity-50">
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                  {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
