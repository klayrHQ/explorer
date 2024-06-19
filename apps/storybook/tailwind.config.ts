// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
    "@repo/src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "@repo/src/components/**/**/*.{js,ts,jsx,tsx,mdx}",
    "@repo/src/components/**/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [sharedConfig],
};

export default config;