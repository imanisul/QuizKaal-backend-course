/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#030712",
        bgSurface: "rgba(255,255,255,0.03)",
        bgElevated: "rgba(255,255,255,0.06)",
        bgCard: "rgba(255,255,255,0.04)",
        borderc: "rgba(255,255,255,0.06)",
        borderStrong: "rgba(255,255,255,0.12)",
        textPrimary: "#f0f0f5",
        textSecondary: "#B8C2D1",
        textTertiary: "#64748b",
        primary: "#4F46E5",
        primaryDim: "rgba(79,70,229,0.15)",
        secondary: "#7C3AED",
        secondaryDim: "rgba(124,58,237,0.15)",
        accent: "#06B6D4",
        accentDim: "rgba(6,182,212,0.15)",
        success: "#10B981",
        successDim: "rgba(16,185,129,0.15)",
        warning: "#F59E0B",
        warningDim: "rgba(245,158,11,0.15)",
        error: "#EF4444",
        errorDim: "rgba(239,68,68,0.15)",
        brandRed: "#e53e3e",
      },
      fontFamily: {
        ui: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "18px",
        "3xl": "24px",
      },
      backdropBlur: {
        xs: "2px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "40px",
      },
      animation: {
        "aurora": "aurora 8s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.4s ease-out",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
