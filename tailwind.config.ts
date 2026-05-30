import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans: ["Source Sans 3", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#8F7AAE",
        "primary-deep": "#675684",
        secondary: "#6F7D5C",
        "secondary-deep": "#4F5B42",
        accent: "#C59BB0",
        "accent-soft": "#DDD1E6",
        bg: "#F7F4EF",
        surface: "#EEE8E1",
        border: "#D8D0C8",
        ink: "#2F2A2A",
        muted: "#6E6662",
      },
    },
  },
  plugins: [],
};
export default config;
