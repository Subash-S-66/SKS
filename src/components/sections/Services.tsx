"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Calendar, ShoppingBag, Users, ChevronRight } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Calendar,
  ShoppingBag,
  Users,
};

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Premium Solutions for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue">
              Modern Businesses
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 max-w-2xl text-lg"
          >
            Transforming complex operational needs into seamless, elegant digital experiences that drive growth and save time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-1 md:col-span-2 py-20 flex justify-center">
              <div className="w-8 h-8 rounded-full border-t-2 border-brand-blue animate-spin" />
            </div>
          ) : (
            services.map((service, index) => {
              const Icon = iconMap[service.icon] || Globe;

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative rounded-3xl glass-card p-8 md:p-10 overflow-hidden"
                >
                  {/* Hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-brand-blue/50 transition-all duration-300">
                      <Icon className="w-6 h-6 text-brand-blue group-hover:text-brand-purple transition-colors duration-300" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-foreground/70 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(138,43,226,0.8)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a href="#contact" className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-purple font-medium transition-colors">
                      Discuss Project <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
