"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Cpu, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    title: "Lightning Fast",
    description: "Optimized for speed. Every millisecond counts when it comes to converting your visitors into paying customers."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
    title: "Bank-Grade Security",
    description: "Built with the latest security standards to ensure your data and your users' data are protected at all times."
  },
  {
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    title: "Scalable Architecture",
    description: "Systems designed to grow with your business, handling traffic spikes effortlessly without breaking a sweat."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
    title: "Responsive by Default",
    description: "Flawless experiences across all devices. Mobile, tablet, or desktop, your brand will always look its best."
  }
];

export function Features() {
  return (
    <section className="py-24 px-4 relative overflow-hidden" id="features">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Excellence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg"
          >
            I do not just build websites; I engineer robust digital products designed for performance and reliability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-start gap-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
