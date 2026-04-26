"use client"
import { motion } from 'framer-motion';

export default function Services({ services }: { services: any[] }) {
  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-[var(--bg-base)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Offer</h2>
          <div className="w-24 h-1 bg-[var(--primary-accent)] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.name}</h3>
              <p className="text-white/60">{service.shortDescription}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
