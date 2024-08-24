import plugin from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  mode:"jit",
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./assets/*.svg"],
  dark: "class",
  theme: {
    extend: {
      screens: {
        xs: "425px",
        ...defaultTheme.screens,
      },
      fontFamily: {
        lato: '"Lato", sans-serif',
      },
      backgroundImage: {
        "auth-nav-bg-lg": "url(../src/assets/bg-sidebar-desktop.svg)",
        "auth-nav-bg-sm": "url(../src/assets/bg-sidebar-mobile.svg)",
      },
    },
  },
  plugins: [plugin({ strategy: "base" })],
};
