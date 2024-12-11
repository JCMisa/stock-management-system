/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0F10",
        foreground: "#E8E9E9",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        light: {
          DEFAULT: "#E8E9E9",
          foreground: "hsl(var(--primary-foreground))",
        },
        dark: {
          DEFAULT: "#0D0F10",
          100: "#131619",
          200: "#1A1D21",
          300: "#363A3D",
          400: "#76828D",
          500: "#ABB8C4",
          foreground: "hsl(var(--primary-foreground))",
        },
        primary: {
          DEFAULT: "#24AE7C",
          100: "#0D2A1F",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#79B5EC",
          100: "#152432",
          foreground: "hsl(var(--secondary-foreground))",
        },
        warning: {
          DEFAULT: "#F37877",
          100: "#3E1716",
          200: "#F24E43",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "#0D0F10",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
