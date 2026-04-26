"use client"
import { motion } from 'framer-motion';

export default function Portfolio({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="portfolio" className="py-24 bg-[#05070d]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
          <div className="w-24 h-1 bg-[var(--primary-accent)] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 aspect-video flex items-center justify-center cursor-pointer"
            >
              {/* Fallback image placeholder since we don't have real images initially */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-accent)]/20 to-[var(--secondary-accent)]/20 opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech: string) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded-full">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
