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
  transparent: "transparent",
  primary: "var(--color-volt)",
  onPrimary: "var(--color-gray-8)",
  secondary: "var(--color-azule)",
  onSecondary: "var(--color-gray-1)",
  background: "var(--color-background)",
  backgroundPrimary: "var(--color-backgroundPrimary)",
  backgroundSecondary: "var(--color-backgroundSecondary)",
  backgroundTertiary: "var(--color-backgroundTertiary)",
  backgroundDark: "var(--color-backgroundDark)",
  backgroundLight: "var(--color-backgroundLight)",
  error: "var(--color-error)",
  success: "var(--color-success)",
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
  "shadow-gray-1": "var(--color-shadow-gray-1)",
  "shadow-gray-2": "var(--color-shadow-gray-2)",
  "shadow-gray-3": "var(--color-shadow-gray-3)",
  "shadow-gray-4": "var(--color-shadow-gray-4)",
  "shadow-gray-5": "var(--color-shadow-gray-5)",
  "shadow-gray-6": "var(--color-shadow-gray-6)",
  "shadow-gray-7": "var(--color-shadow-gray-7)",
  "shadow-gray-8": "var(--color-shadow-gray-8)",
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
  "icon-xl": ["32px"],
  "icon-md": ["24px"],
  "icon-sm": ["20px"],
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
  "2xs": "2px",
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "10px",
  lxl: "12px",
  xl: "14px",
  "2xl": "20px",
  "3xl": "24px",
  sidebarMinSpacing: "22px",
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

const overflow = {
  auto: "auto",
  hidden: "hidden",
  visible: "visible",
  scroll: "scroll",
}

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
  screen: "100vh",
  full: "100%",
  max: "max-content",
  min: "min-content",
  buttonHeight: "44px",
  inputHeight: "44px",
  badgeHeight: "26px",
  newsCardHeight: '240px',
  newsCardMobileHeight: '160px',
  menuItemHeight: "48px",
  logoImgHeight: "23px",
}

const width = {
  screen: "100vw",
  full: "100%",
  max: "max-content",
  min: "min-content",
  menuIconWidth: "24px",
  iconButtonWidth: "44px",
  sidebarWidth: "240px",
  sidebarMinWidth: "88px",
  minimizedMenuItemWidth: "48px",
  logoImgWidth: "23px",
  newsCardWidth: '362px',
  newsCardMobileWidth: '382px',
}

const lineClamp = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5:  '5',
  6: '6',
  none: 'none',
}

const shadow = {
  md: "0px 0px 10px rgba(0, 0, 0, 0.3), -4px 0px 10px rgba(0, 0, 0, 0.3)",
}

const justify = {
  normal: "normal",
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
}

const gridCols = {
  1: "repeat(1, minmax(0, 1fr))",
  2: "repeat(2, minmax(0, 1fr))",
  3: "repeat(3, minmax(0, 1fr))",
  4: "repeat(4, minmax(0, 1fr))",
  5: "repeat(5, minmax(0, 1fr))",
  6: "repeat(6, minmax(0, 1fr))",
  7: "repeat(7, minmax(0, 1fr))",
  8: "repeat(8, minmax(0, 1fr))",
  9: "repeat(9, minmax(0, 1fr))",
  10: "repeat(10, minmax(0, 1fr))",
  11: "repeat(11, minmax(0, 1fr))",
  12: "repeat(12, minmax(0, 1fr))",
  none: "none",
  subgrid: "subgrid",
}

const autoCols = {
  auto: "auto",
  min: "min-content",
  max: "max-content",
  fr: "minmax(0, 1fr)",
}

const transition = {
  none: null,
  all: null,
  DEFAULT: null,
}

const duration = {
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1000: "1000ms",
}

const ease = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
}

const position = {
  static: "static",
  clip: "clip",
  fixed: "fixed",
  absolute: "absolute",
  relative: "relative",
  sticky: "sticky",
}

const zIndex = {
  auto: "auto",
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  60: 60,
  70: 70,
  80: 80,
  90: 90,
  100: 100,
  200: 200,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
  800: 800,
  900: 900,
  1000: 1000,
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
  lineClamp,
  shadow,
  justify,
  gridCols,
  autoCols,
  transition,
  duration,
  ease,
  position,
  overflow,
  zIndex,
};