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
  small: "12px",
  medium: "1rem",
  sm: "0.125rem",
  DEFAULT: "0.5rem",
  large: "1.5rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.8125rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  "extraLarge": "3rem",
  full: "9999px",
};

const colors = {
  volt: "var(--color-volt)",
  voltDark: "var(--color-voltDark)",
  azule: "var(--color-azule)",
  azuleDark: "var(--color-azuleDark)",
  eerie: "var(--color-eerie)",
  eerieLight: "var(--color-eerieDark)",
  lobster: "var(--color-lobster)",
  lobsterDark: "var(--color-lobsterDark)",
  sand: "var(--color-sand)",
  sandDark: "var(--color-sandDark)",
  tulip: "var(--color-tulip)",
  green: "var(--color-green)",
  black: "var(--color-black)",
  white: "var(--color-white)",
  gray: "var(--color-gray)",
};

const fontSize = {
  8: ["0.5rem", { lineHeight: "1.5em", }],
  9: ["0.5625rem", { lineHeight: "1.5em", }],
  10: ["0.625rem", { lineHeight: "1.5em", }],
  12: ["0.75rem", { lineHeight: "1.5em", }],
  14: ["0.875rem", { lineHeight: "1.5em", }],
  16: ["1rem", { lineHeight: "1.5em", }],
  20: ["1.25rem", { lineHeight: "1.5em", }],
  24: ["1.5rem", { lineHeight: "1.5em", }],
  28: ["1.75rem", { lineHeight: "1.5em", }],
  32: ["2rem", { lineHeight: "1.5em", }],
  40: ["2.5rem", { lineHeight: "1.5em", }],
  48: ["3rem", { lineHeight: "1.5em", }],
  80: ["5rem", { lineHeight: "1.25em", }],
};

export {
  borderRadius,
  borderWidth,
  colors,
  fontSize,
};