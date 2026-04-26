"use client"
import { useEffect, useState } from 'react';

export default function SettingsManager() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>

      <form onSubmit={handleSave} className="space-y-8">

        {/* Colors */}
        <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Theming</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Primary Accent</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.primaryAccent || '#00D4FF'}
                  onChange={e => setSettings({...settings, primaryAccent: e.target.value})}
                  className="h-10 w-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.primaryAccent || '#00D4FF'}
                  onChange={e => setSettings({...settings, primaryAccent: e.target.value})}
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 focus:border-[var(--primary-accent)] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Secondary Accent</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.secondaryAccent || '#7C3AED'}
                  onChange={e => setSettings({...settings, secondaryAccent: e.target.value})}
                  className="h-10 w-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.secondaryAccent || '#7C3AED'}
                  onChange={e => setSettings({...settings, secondaryAccent: e.target.value})}
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 focus:border-[var(--primary-accent)] outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Headline</label>
              <input
                type="text"
                value={settings.heroHeadline || ''}
                onChange={e => setSettings({...settings, heroHeadline: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:border-[var(--primary-accent)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Taglines (comma separated)</label>
              <input
                type="text"
                value={settings.heroTaglines?.join(', ') || ''}
                onChange={e => setSettings({...settings, heroTaglines: e.target.value.split(',').map((s: string) => s.trim())})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:border-[var(--primary-accent)] outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Primary CTA Label</label>
                <input type="text" value={settings.heroCtaPrimaryLabel || ''} onChange={e => setSettings({...settings, heroCtaPrimaryLabel: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:border-[var(--primary-accent)] outline-none"/>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Secondary CTA Label</label>
                <input type="text" value={settings.heroCtaSecondaryLabel || ''} onChange={e => setSettings({...settings, heroCtaSecondaryLabel: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:border-[var(--primary-accent)] outline-none"/>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Contact Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Contact Email</label>
              <input type="email" value={settings.contactEmail || ''} onChange={e => setSettings({...settings, contactEmail: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:border-[var(--primary-accent)] outline-none"/>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Contact Phone</label>
              <input type="text" value={settings.contactPhone || ''} onChange={e => setSettings({...settings, contactPhone: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:border-[var(--primary-accent)] outline-none"/>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 bg-[var(--primary-accent)] text-black font-bold rounded-xl hover:bg-opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
}
