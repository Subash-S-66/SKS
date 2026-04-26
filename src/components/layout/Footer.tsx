"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();
  const clickCount = useRef(0);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleAdminTrigger = () => {
    clickCount.current += 1;

    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      router.push("/admin/login");
    }

    clickTimeout.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000); // Reset if 5 clicks don't happen within 2 seconds
  };

  return (
    <footer className="relative border-t border-white/5 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left side with hidden trigger */}
        <div className="flex items-center gap-2 relative">
          <div
            onClick={handleAdminTrigger}
            className="absolute -left-4 -top-4 w-12 h-12 cursor-default"
            aria-hidden="true"
          />
          <span className="font-bold text-xl tracking-tighter">SKS</span>
          <span className="text-foreground/40 text-sm">© {new Date().getFullYear()}</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm text-foreground/60">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>

      </div>
    </footer>
  );
}
