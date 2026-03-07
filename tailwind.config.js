/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#E8A020",
        "gold-2": "#F5C842",
        green: "#00C896",
        blue: "#4D8EFF",
        red: "#FF5252",
        orange: "#FF8C00",
        text: "#EEF2FF",
        muted: "#6B7FA3",
        muted2: "#3A4D6B",
        border: "#1E2D45",
        border2: "#273852",
        surface: "#0C1220",
        surface2: "#111927",
        card: "#141E30",
        bg: "#05080F",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "fade-slide-up": {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        spin: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.4s ease forwards",
        pulse: "pulse 1.5s infinite",
        ticker: "ticker 40s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        spin: "spin 0.8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
