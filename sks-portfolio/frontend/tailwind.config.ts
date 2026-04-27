import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-accent': 'var(--primary-accent)',
        'secondary-accent': 'var(--secondary-accent)',
        'bg-base': 'var(--bg-base)',
      },
      backgroundColor: {
        base: 'var(--bg-base)',
      },
      textColor: {
        accent: 'var(--primary-accent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px var(--primary-accent)',
          },
          '50%': {
            boxShadow: '0 0 30px var(--primary-accent), 0 0 40px var(--secondary-accent)',
          },
        },
      },
      boxShadow: {
        glow: '0 0 30px var(--primary-accent)',
        'glow-lg': '0 0 40px var(--primary-accent)',
      },
    },
  },
  plugins: [],
};
export default config;
