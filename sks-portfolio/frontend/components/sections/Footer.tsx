"use client"

export default function Footer({ settings }: { settings: any }) {
  return (
    <footer className="bg-black py-12 relative border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold tracking-tighter mb-2">SKS<span className="text-[var(--primary-accent)]">.</span></div>
          <p className="text-white/50 text-sm">{settings?.footerTagline || 'Digital Excellence'}</p>
        </div>

        <div className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} SKS Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
