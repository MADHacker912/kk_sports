/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: "#F8F7F3",
          secondary: "#F0EFE9",
          border: "#E7E5DE",
          card: "#FFFFFF",
        },
        ink: {
          primary: "#242720",
          secondary: "#77776F",
          muted: "#9E9E94",
        },
        sage: {
          DEFAULT: "#66785F",
          hover: "#55644F",
          light: "#EBEFE8",
        },
      },
      fontFamily: {
        headline: ["'Manrope'", "'DM Sans'", "sans-serif"],
        display: ["'Manrope'", "sans-serif"],
        body: ["'DM Sans'", "'Inter'", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
}
