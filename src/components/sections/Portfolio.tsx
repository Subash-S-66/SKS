"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

const projects = [
  {
    title: "Aura E-Commerce Platform",
    category: "Full-Stack System",
    description: "A high-performance headless e-commerce solution with Next.js and Stripe, featuring sub-second page loads and dynamic inventory.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2000&auto=format&fit=crop",
    tech: ["Next.js", "Tailwind", "Stripe", "PostgreSQL"],
    live: "#",
    github: "#"
  },
  {
    title: "Nova Booking App",
    category: "SaaS Application",
    description: "An automated booking and scheduling system for clinics, featuring calendar syncing, SMS reminders, and complex state management.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    tech: ["React", "Node.js", "MongoDB", "Twilio"],
    live: "#",
    github: "#"
  },
  {
    title: "Vertex Analytics Dashboard",
    category: "Enterprise Software",
    description: "A real-time data visualization dashboard aggregating metrics from multiple APIs into a single, cohesive, dark-mode interface.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop",
    tech: ["Vue.js", "D3.js", "Express", "Redis"],
    live: "#",
    github: "#"
  }
];

export function Portfolio() {
  return (
    <section className="py-24 px-4 relative bg-background/50" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Works</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground/60 text-lg"
            >
              A glimpse into the digital solutions I have engineered for ambitious brands and forward-thinking businesses.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium">
              View All Projects
            </button>
          </motion.div>
        </div>

        <div className="flex flex-col gap-16">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              {/* Image side */}
              <div className="w-full lg:w-3/5 group relative rounded-2xl overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                <div
                  className="aspect-[16/10] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>

              {/* Content side */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <span className="text-blue-400 font-mono text-sm mb-3 tracking-wider uppercase">
                  {project.category}
                </span>
                <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                <p className="text-foreground/60 leading-relaxed mb-6 text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-foreground/80">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href={project.live} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                  <a href={project.github} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium">
                    <Code className="w-4 h-4" /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
