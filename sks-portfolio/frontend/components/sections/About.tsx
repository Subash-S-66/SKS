"use client"
import { motion } from 'framer-motion';

export default function About({ settings }: { settings: any }) {
  const stats = settings?.aboutStats || [];

  return (
    <section id="about" className="py-24 bg-[var(--bg-base)]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h2>
            <div className="w-24 h-1 bg-[var(--primary-accent)] rounded-full mb-8"></div>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              {settings?.aboutText || "Welcome to SKS Services. We build world-class digital platforms."}
            </p>
          </motion.div>

          <div className="flex-1 grid grid-cols-2 gap-6 w-full">
            {stats.map((stat: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center"
              >
                <div className="text-4xl font-bold text-[var(--primary-accent)] mb-2">{stat.value}</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
