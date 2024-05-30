import type { Config } from "tailwindcss";
import {
  borderRadius,
  borderWidth,
  colors,
  fontSize,
} from "./tailwind-classes";


const getKeyMap = (obj, prefix) => {
  return [
    ...Object.keys(obj).map((key) => `${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `tablet:${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `desktop:${prefix}-${key}`),
  ];
};

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  safelist: [
    ...getKeyMap(colors, "text"),
    ...getKeyMap(colors, "bg"),
    ...getKeyMap(colors, "border"),
    ...getKeyMap(borderWidth, "border"),
    ...getKeyMap(borderRadius, "rounded"),
    ...getKeyMap(fontSize, "text"),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
    },
    fontFamily: {
      sans: ["Utendo", "Inter", "Verdana", "sans-serif"],
      body: ["Utendo", "Inter", "Verdana", "sans-serif"],
    },
    colors,
    fontSize,
    borderWidth,
    borderRadius,
  },
  plugins: [],
};
export default config;
