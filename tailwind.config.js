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
        // Brand accent — warm gold, rust, green, blue, red
        gold:     "#b8924a",
        "gold-2": "#d4a85e",
        "gold-3": "#f0c878",
        rust:     "#c45e38",
        "rust-2": "#da7450",
        green:    "#3d7a52",
        "green-2":"#52a06a",
        blue:     "#3a6498",
        "blue-2": "#5080b8",
        red:      "#b04040",
        orange:   "#c07828",
        // Text scale (warm darks)
        text:    "#1a1612",
        "text-2":"#3e3830",
        muted:   "#7a7268",
        muted2:  "#b0a898",
        muted3:  "#d4cec6",
        // Borders (warm, very subtle)
        border:  "#ece6dd",
        border2: "#e0d9cf",
        border3: "#d4ccc0",
        // Backgrounds — warm parchment light theme
        bg:       "#f0ece4",
        "bg-2":   "#e8e2d8",
        "bg-3":   "#ddd6c8",
        surface:  "#faf8f4",
        surface2: "#f0ece4",
        card:     "#ffffff",
      },
      fontFamily: {
        sans:    ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        // serif → Syne so existing font-serif classes use the display font
        serif:   ["var(--font-syne)", "sans-serif"],
        mono:    ["var(--font-dm-mono)", "monospace"],
      },
      keyframes: {
        "fade-slide-up": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: 0, transform: "translateX(20px)" },
          to:   { opacity: 1, transform: "translateX(0)" },
        },
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%":      { opacity: 0.3, transform: "scale(0.7)" },
        },
        spin: { to: { transform: "rotate(360deg)" } },
        "rot-slow": { to: { transform: "rotate(360deg)" } },
        "hero-in": {
          from: { opacity: 0, transform: "translateY(12px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        "ctx-pulse": {
          "0%, 100%": { opacity: 1 },
          "50%":      { opacity: 0.25 },
        },
        "msg-in": {
          from: { opacity: 0, transform: "translateY(4px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-slide-up":  "fade-slide-up 0.32s ease-out both",
        "slide-in-right": "slide-in-right 0.26s cubic-bezier(0.2,0,0,1) both",
        ticker:           "ticker 52s linear infinite",
        blink:            "blink 1.6s ease-in-out infinite",
        spin:             "spin 0.8s linear infinite",
        "rot-slow":       "rot-slow 16s linear infinite",
        "hero-in":        "hero-in 0.5s cubic-bezier(0.2,0,0,1) both",
        "ctx-pulse":      "ctx-pulse 2.8s ease-in-out infinite",
        "msg-in":         "msg-in 0.22s ease-out both",
        shimmer:          "shimmer 2s linear infinite",
      },
      boxShadow: {
        s1: "0 1px 3px rgba(26,22,18,.06)",
        s2: "0 2px 10px rgba(26,22,18,.08), 0 1px 3px rgba(26,22,18,.05)",
        s3: "0 4px 24px rgba(26,22,18,.10), 0 1px 4px rgba(26,22,18,.06)",
        s4: "0 8px 40px rgba(26,22,18,.13), 0 2px 8px rgba(26,22,18,.06)",
        s5: "0 20px 64px rgba(26,22,18,.18), 0 4px 16px rgba(26,22,18,.08)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
