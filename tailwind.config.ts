import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Main brand color - soft teal, used for action, confirmation
        primary: {
          DEFAULT: "#0a7560",
          light: "var(--color-primary-light)",
        },
        // Warm white or light sage for section backgrounds
        secondary: "var(--color-secondary)",
        // Soft amber/coral for highlights
        accent: "var(--color-accent)",
        // Neutrals for text and borders
        neutral: {
          50: "var(--color-neutral-50)",
          100: "var(--color-neutral-100)",
          200: "var(--color-neutral-200)",
          300: "var(--color-neutral-300)",
          400: "var(--color-neutral-400)",
          500: "var(--color-neutral-500)",
          600: "var(--color-neutral-600)",
          700: "var(--color-neutral-700)",
          800: "var(--color-neutral-800)",
          900: "var(--color-neutral-900)",
        },
        // Card backgrounds, slightly off-white (warm)
        surface: "var(--color-surface)",
        // Strict success variant matches primary
        success: "var(--color-primary)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        sm: ["0.875rem", { lineHeight: "1.5rem" }],
        base: ["1rem", { lineHeight: "1.75rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "2rem" }],
        "2xl": ["1.5rem", { lineHeight: "2.25rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
      boxShadow: {
        // Subtle, warm shadows instead of cold grays
        card: "0 4px 20px -2px rgba(92, 84, 75, 0.08), 0 0 3px rgba(92, 84, 75, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
