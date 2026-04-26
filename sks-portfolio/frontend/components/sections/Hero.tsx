"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const DynamicCanvas = dynamic(() => import('./HeroCanvas').then(mod => mod.default), { ssr: false });

export default function Hero({ settings }: { settings: any }) {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = settings?.heroTaglines || ['Web Development', 'Digital Solutions'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[var(--bg-base)]">
        <DynamicCanvas />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[var(--bg-base)] pointer-events-none" />

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          {settings?.heroHeadline || 'SKS Services'}
        </motion.h1>

        <motion.div
          key={taglineIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl text-[var(--primary-accent)] mb-10 h-12"
        >
          {taglines[taglineIndex]}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#portfolio" className="px-8 py-4 bg-[var(--primary-accent)] text-black font-semibold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 will-change-transform">
            {settings?.heroCtaPrimaryLabel || 'See My Work'}
          </a>
          <a href="#contact" className="px-8 py-4 border border-[var(--primary-accent)] text-[var(--primary-accent)] font-semibold rounded-full hover:bg-[var(--primary-accent)] hover:bg-opacity-10 transition-all transform hover:scale-105 will-change-transform">
            {settings?.heroCtaSecondaryLabel || 'Get a Free Quote'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
