const borderWidth = {
  DEFAULT: "1px",
  0: "0px",
  1: "0.1rem",
  2: "2px",
  4: "4px",
  8: "8px",
  none: "none",
};

const borderRadius = {
  none: "0px",
  xs: "4px",
  sm: "6px",
  md: "8px",
  DEFAULT: "8px",
  lg: "10px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "40px",
  full: "9999px",
};

const colors = {
  volt: "var(--color-volt)",
  voltDark: "var(--color-voltDark)",
  azule: "var(--color-azule)",
  azuleDark: "var(--color-azuleDark)",
  lobster: "var(--color-lobster)",
  lobsterDark: "var(--color-lobsterDark)",
  sand: "var(--color-sand)",
  sandDark: "var(--color-sandDark)",
  tulip: "var(--color-tulip)",
  tulipDark: "var(--color-tulipDark)",
  green: "var(--color-green)",
  greenDark: "var(--color-greenDark)",
  black: "var(--color-black)",
  white: "var(--color-white)",
  "gray-1": "var(--color-gray-1)",
  "gray-2": "var(--color-gray-2)",
  "gray-3": "var(--color-gray-3)",
  "gray-4": "var(--color-gray-4)",
  "gray-5": "var(--color-gray-5)",
  "gray-6": "var(--color-gray-6)",
  "gray-7": "var(--color-gray-7)",
  "gray-8": "var(--color-gray-8)",
};

const fontSize = {
  body: ["16px", { lineHeight: "22px", }],
  "display-1": ["72px", { lineHeight: "86px", }],
  "display-2": ["60px", { lineHeight: "76px", }],
  "heading-1": ["48px", { lineHeight: "60px", }],
  "heading-2": ["39px", { lineHeight: "50px", }],
  "heading-3": ["33px", { lineHeight: "42px", }],
  "heading-4": ["28px", { lineHeight: "36px", }],
  "heading-5": ["22px", { lineHeight: "28px", }],
  "heading-6": ["18px", { lineHeight: "25px", }],
  subheading: ["20px", { lineHeight: "26px", }],
  "paragraph-xl": ["21px", { lineHeight: "30px", }],
  "paragraph-lg": ["18px", { lineHeight: "26px", }],
  "paragraph-md": ["16px", { lineHeight: "22px", }],
  "paragraph-sm": ["14px", { lineHeight: "20px", }],
  footer: ["10px", { lineHeight: "16px", }],
  caption: ["12px", { lineHeight: "18px", }],
};

const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

const spacing = {
  px: "1px",
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "10px",
  xl: "14px",
  "2xl": "20px",
  "3xl": "24px",
}

export default {
  borderRadius,
  borderWidth,
  colors,
  fontSize,
  fontWeight,
  spacing,
};