"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO at TechFlow",
    content: "SKS completely transformed our online presence. The new system is not only visually stunning but incredibly fast. Our conversion rate jumped by 40% in the first month.",
    initials: "SJ"
  },
  {
    name: "Marcus Chen",
    role: "Founder, Peak Performance",
    content: "Working with SKS was a game-changer. The attention to detail, modern UI/UX principles, and flawless execution made our SaaS product stand out in a crowded market.",
    initials: "MC"
  },
  {
    name: "Elena Rodriguez",
    role: "Director of Marketing, Lumina",
    content: "I have hired many freelancers, but none matched this level of professionalism and technical skill. The end product feels like a premium enterprise solution.",
    initials: "ER"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 relative overflow-hidden" id="testimonials">
      {/* Background elements */}
      <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Success</span> Stories
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Do not just take my word for it. Here is what industry leaders have to say about the digital experiences I deliver.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
            >
              <Quote className="w-10 h-10 text-white/10 absolute top-6 right-6" />

              <div className="flex flex-col h-full justify-between gap-6">
                <p className="text-foreground/80 leading-relaxed relative z-10 text-lg italic">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="flex items-center gap-4 mt-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-lg shadow-inner">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/50">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
