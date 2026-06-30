import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        ohaus: {
          red: "var(--ohaus-red)",
          "red-dark": "var(--ohaus-red-dark)",
          ink: "var(--ohaus-ink)",
          "gray-dark": "var(--ohaus-gray-dark)",
          muted: "var(--ohaus-muted)",
          line: "var(--ohaus-line)",
          bg: "var(--ohaus-bg)",
          "bg-soft": "var(--ohaus-bg-soft)",
        },
      },
      fontFamily: {
        heading: ["var(--font-roboto)", "system-ui", "sans-serif"],
        sans: ["var(--font-open-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "2px",
        md: "4px",
      },
      maxWidth: {
        site: "1320px",
      },
      boxShadow: {
        header: "0 2px 8px rgba(0, 0, 0, 0.08)",
        card: "0 1px 4px rgba(0, 0, 0, 0.06)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
