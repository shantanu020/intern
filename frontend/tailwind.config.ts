import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#09090b", // Zinc 950
          secondary: "#18181b", // Zinc 900
          card: "#121212",
        },
        accent: {
          DEFAULT: "#ffffff",
          2: "#d4d4d8", // zinc-300
          3: "#a1a1aa", // zinc-400
          light: "#fafafa",
          muted: "#71717a", // Zinc 400
          border: "rgba(255,255,255,0.08)",
        },
        edge: "rgba(255,255,255,0.08)",

        copy: {
          primary: "#fafafa", // Zinc 50
          secondary: "#a1a1aa", // Zinc 400
          muted: "#52525b", // Zinc 600
        },
        status: {
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        }
      },
      fontFamily: {
        display: ["var(--font-syne)"],
        sans: ["var(--font-dm-sans)"],
      },
      borderRadius: {
        'sm': "4px",
        'md': "8px",
        'lg': "12px",
        'xl': "16px",
      },
      boxShadow: {
        'sm': "0 1px 2px rgba(0,0,0,0.4)",
        'md': "0 4px 12px rgba(0,0,0,0.5)",
        'premium': "0 20px 50px rgba(0,0,0,0.6)",
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      }
    },
  },
  plugins: [],
};
export default config;

