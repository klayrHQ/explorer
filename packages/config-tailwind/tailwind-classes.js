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

const screens = {
  desktop: "1024px",
  tablet: "440px",
};

const display = {
  block: null,
  "inline-block": null,
  inline: null,
  flex: null,
  "inline-flex": null,
  table: null,
  "inline-table": null,
  "table-caption": null,
  "table-cell": null,
  "table-column": null,
  "table-column-group": null,
  "table-footer-group": null,
  "table-header-group": null,
  "table-row-group": null,
  "table-row": null,
  "flow-root": null,
  grid: null,
  "inline-grid": null,
  contents: null,
  "list-item": null,
  hidden: null,
  "flex-row": null,
  "flex-row-reverse": null,
  "flex-col": null,
  "flex-col-reverse": null,
};

const percentages = {
  1: "10%",
  2: "20%",
  3: "30%",
  4: "40%",
  5: "50%",
  6: "60%",
  7: "70%",
  8: "80%",
  9: "90%",
  10: "100%",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  full: "100%",
}

const cursor = {
  auto: "auto",
  default: "default",
  pointer: "pointer",
  wait: "wait",
  text: "text",
  move: "move",
  help: "help",
  "not-allowed": "not-allowed",
  none: "none",
  "context-menu": "context-menu",
  progress: "progress",
  cell: "cell",
  crosshair: "crosshair",
  "vertical-text": "vertical-text",
  alias: "alias",
  copy: "copy",
  "no-drop": "no-drop",
  grab: "grab",
  grabbing: "grabbing",
  "all-scroll": "all-scroll",
  "col-resize": "col-resize",
  "row-resize": "row-resize",
  "n-resize": "n-resize",
  "e-resize": "e-resize",
  "s-resize": "s-resize",
  "w-resize": "w-resize",
  "ne-resize": "ne-resize",
  "nw-resize": "nw-resize",
  "se-resize": "se-resize",
  "sw-resize": "sw-resize",
  "ew-resize": "ew-resize",
  "ns-resize": "ns-resize",
  "nesw-resize": "nesw-resize",
  "nwse-resize": "nwse-resize",
  "zoom-in": "zoom-in",
  "zoom-out": "zoom-out",
}

const leading = {
  "leading-3": null,
  "leading-4": null,
  "leading-5": null,
  "leading-6": null,
  "leading-7": null,
  "leading-8": null,
  "leading-9": null,
  "leading-10": null,
  "leading-none": null,
  "leading-tight": null,
  "leading-snug": null,
  "leading-normal": null,
  "leading-relaxed": null,
  "leading-loose": null,
}

const height = {
  buttonHeight: "44px",
  inputHeight: "44px",
  badgeHeight: "26px",
}

const width = {
  iconButtonWidth: "44px",
}

export default {
  borderRadius,
  borderWidth,
  colors,
  fontSize,
  fontWeight,
  spacing,
  screens,
  display,
  percentages,
  cursor,
  leading,
  height,
  width,
};