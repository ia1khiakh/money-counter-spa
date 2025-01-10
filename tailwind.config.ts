import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        default: "16px",
      },
      screens: {
        sm: "640px",
        // md: "768px",
        // lg: "1024px",
        // xl: "1280px",
        // "2xl": "1536px",
      },
    },
    extend: {
      fontSize: {
        "c-xxs": "0.6875rem",
      },
    },
  },
} satisfies Config;
