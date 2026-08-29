import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#08090F",
          panel: "#0E1018",
          raised: "#12141F",
        },
        edge: "rgba(255,255,255,0.08)",
        // Legacy token names kept so components can reference them directly;
        // redefined here for the dark, futuristic theme.
        ink: {
          DEFAULT: "#F1F3F9", // primary light foreground text
          light: "#9CA3B5", // muted secondary foreground
        },
        stone: {
          DEFAULT: "#08090F", // page background (near-black)
          dark: "#12141A", // raised card surface
        },
        brass: {
          DEFAULT: "#22D3EE", // primary accent (electric cyan)
          light: "#67E8F9",
          dark: "#0891B2",
        },
      },
      fontFamily: {
        display: ["Avenir Next", "Segoe UI", "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "sans-serif"],
        body: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Inter", "sans-serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.18em",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(90deg, #22D3EE 0%, #8B5CF6 100%)",
        "accent-gradient-vertical": "linear-gradient(180deg, #22D3EE 0%, #8B5CF6 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(139,92,246,0.45)",
        "glow-cyan": "0 0 40px -8px rgba(34,211,238,0.45)",
      },
      animation: {
        aurora: "aurora 18s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.08)" },
          "66%": { transform: "translate(-4%, 4%) scale(0.96)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
