import type { Config } from "tailwindcss";
import { classes } from "./tailwind-classes.ts";

const {
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
  whitespace,
  shrink,
  grow,
  objectFit,
  colSpan,
} = classes;

// @ts-ignore
const getKeyMap = (obj, prefix) => {
  return [
    ...Object.keys(obj).map((key) => `${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `tablet:${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `desktop:${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `mobile:${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `sidebarBp:${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `hover:${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `focus:${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `group-hover:${prefix}-${key}`),
    ...Object.keys(obj).map((key) => `last:${prefix}-${key}`),

  ];
};

// @ts-ignore
const getKeyOnlyMap = (obj) => {
  return [
    ...Object.keys(obj).map((key) => key),
    ...Object.keys(obj).map((key) => `tablet:${key}`),
    ...Object.keys(obj).map((key) => `desktop:${key}`),
  ];
};

const numberList = {
  px: 0,
  0: 0,
  0.5: 0,
  1: 0,
  1.5: 0,
  2: 0,
  2.5: 0,
  3: 0,
  3.5: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  14: 0,
  16: 0,
  20: 0,
  24: 0,
  28: 0,
  32: 0,
  36: 0,
  40: 0,
  44: 0,
  48: 0,
  52: 0,
  56: 0,
  60: 0,
  64: 0,
  72: 0,
  80: 0,
  96: 0,
  auto: "auto",
  none: "none",
};

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  safelist: [
    ...getKeyMap(colors, "text"),
    ...getKeyMap(colors, "bg"),
    ...getKeyMap(colors, "border"),
    ...getKeyMap(colors, "border-t"),
    ...getKeyMap(colors, "border-r"),
    ...getKeyMap(colors, "border-b"),
    ...getKeyMap(colors, "border-l"),
    ...getKeyMap(colors, "border-x"),
    ...getKeyMap(colors, "border-y"),
    ...getKeyMap(colors, "shadow"),
    ...getKeyMap(borderWidth, "border"),
    ...getKeyMap(borderWidth, "border-t"),
    ...getKeyMap(borderWidth, "border-r"),
    ...getKeyMap(borderWidth, "border-b"),
    ...getKeyMap(borderWidth, "border-l"),
    ...getKeyMap(borderWidth, "border-x"),
    ...getKeyMap(borderWidth, "border-y"),
    ...getKeyMap(numberList, "ring"),
    ...getKeyMap(numberList, "outline"),
    ...getKeyMap(borderRadius, "rounded"),
    ...getKeyMap(borderRadius, "rounded-s"),
    ...getKeyMap(borderRadius, "rounded-e"),
    ...getKeyMap(borderRadius, "rounded-t"),
    ...getKeyMap(borderRadius, "rounded-r"),
    ...getKeyMap(borderRadius, "rounded-b"),
    ...getKeyMap(borderRadius, "rounded-l"),
    ...getKeyMap(borderRadius, "rounded-tl"),
    ...getKeyMap(borderRadius, "rounded-tr"),
    ...getKeyMap(borderRadius, "rounded-bl"),
    ...getKeyMap(borderRadius, "rounded-br"),
    ...getKeyMap(fontSize, "text"),
    ...getKeyMap(fontWeight, "font"),
    ...getKeyMap(height, "h"),
    ...getKeyMap(numberList, "h"),
    ...getKeyMap(percentages, "h"),
    ...getKeyMap(height, "min-h"),
    ...getKeyMap(numberList, "min-h"),
    ...getKeyMap(percentages, "min-h"),
    ...getKeyMap(height, "max-h"),
    ...getKeyMap(numberList, "max-h"),
    ...getKeyMap(percentages, "max-h"),
    ...getKeyMap(width, "w"),
    ...getKeyMap(numberList, "w"),
    ...getKeyMap(percentages, "w"),
    ...getKeyMap(numberList, "min-w"),
    ...getKeyMap(width, "min-w"),
    ...getKeyMap(percentages, "min-w"),
    ...getKeyMap(numberList, "max-w"),
    ...getKeyMap(width, "max-w"),
    ...getKeyMap(percentages, "max-w"),
    ...getKeyMap(numberList, "m"),
    ...getKeyMap(spacing, "m"),
    ...getKeyMap(numberList, "mr"),
    ...getKeyMap(spacing, "mr"),
    ...getKeyMap(numberList, "my"),
    ...getKeyMap(spacing, "my"),
    ...getKeyMap(numberList, "mx"),
    ...getKeyMap(spacing, "mx"),
    ...getKeyMap(numberList, "mb"),
    ...getKeyMap(spacing, "mb"),
    ...getKeyMap(numberList, "mt"),
    ...getKeyMap(spacing, "mt"),
    ...getKeyMap(numberList, "ml"),
    ...getKeyMap(spacing, "ml"),
    ...getKeyMap(numberList, "mr"),
    ...getKeyMap(spacing, "mr"),
    ...getKeyMap(numberList, "p"),
    ...getKeyMap(spacing, "p"),
    ...getKeyMap(numberList, "px"),
    ...getKeyMap(spacing, "px"),
    ...getKeyMap(numberList, "py"),
    ...getKeyMap(spacing, "py"),
    ...getKeyMap(numberList, "pb"),
    ...getKeyMap(spacing, "pb"),
    ...getKeyMap(numberList, "pt"),
    ...getKeyMap(spacing, "pt"),
    ...getKeyMap(numberList, "pr"),
    ...getKeyMap(spacing, "pr"),
    ...getKeyMap(numberList, "pl"),
    ...getKeyMap(spacing, "pl"),
    ...getKeyMap(numberList, "gap"),
    ...getKeyMap(spacing, "gap"),
    ...getKeyMap(numberList, "top"),
    ...getKeyMap(spacing, "top"),
    ...getKeyMap(height, "top"),
    ...getKeyMap(width, "top"),
    ...getKeyMap(numberList, "inset"),
    ...getKeyMap(spacing, "inset"),
    ...getKeyMap(height, "inset"),
    ...getKeyMap(width, "inset"),
    ...getKeyMap(numberList, "bottom"),
    ...getKeyMap(spacing, "bottom"),
    ...getKeyMap(height, "bottom"),
    ...getKeyMap(width, "bottom"),
    ...getKeyMap(numberList, "left"),
    ...getKeyMap(spacing, "left"),
    ...getKeyMap(height, "left"),
    ...getKeyMap(width, "left"),
    ...getKeyMap(numberList, "right"),
    ...getKeyMap(spacing, "right"),
    ...getKeyMap(height, "right"),
    ...getKeyMap(width, "right"),
    ...getKeyMap(percentages, "grayscale"),
    ...getKeyMap(percentages, "brightness"),
    ...getKeyMap(cursor, "cursor"),
    ...getKeyMap(shadow, "shadow"),
    ...getKeyMap(justify, "justify"),
    ...getKeyMap(gridCols, "grid-cols"),
    ...getKeyMap(gridCols, "grid-rows"),
    ...getKeyMap(autoCols, "auto-cols"),
    ...getKeyMap(autoCols, "auto-rows"),
    ...getKeyOnlyMap(display),
    ...getKeyOnlyMap(leading),
    ...getKeyOnlyMap(position),
    ...getKeyMap(transition, "transition"),
    ...getKeyMap(duration, "duration"),
    ...getKeyMap(ease, "ease"),
    ...getKeyMap(overflow, "overflow"),
    ...getKeyMap(overflow, "overflow-x"),
    ...getKeyMap(overflow, "overflow-y"),
    ...getKeyMap(lineClamp, 'line-clamp'),
    ...getKeyMap(zIndex, 'z'),
    ...getKeyMap(zIndex, '-z'),
    ...getKeyMap(whitespace, 'whitespace'),
    ...getKeyMap(shrink, 'shrink'),
    ...getKeyMap(grow, 'grow'),
    ...getKeyMap(objectFit, "object"),
    ...getKeyMap(colSpan, "col"),
    "border-collapse",
    "border-spacing-0",
  ],
  theme: {
    extend: {
      spacing,
      fontSize,
      screens,
      grayscale: percentages,
      brightness: percentages,
      height: {
        ...height,
        ...percentages,
      },
      width: {
        ...width,
        ...percentages,
      },
      maxWidth: {
        ...width,
        ...percentages,
      },
      minWidth: {
        ...width,
        ...percentages,
      },
      boxShadow: shadow,
      zIndex,
      inset: {
        ...height,
        ...width,
        ...spacing,
      }
    },
    fontFamily: {
      sans: ["Utendo", "Inter", "Verdana", "sans-serif"],
      body: ["Utendo", "Inter", "Verdana", "sans-serif"],
      mono: ["monospace"],
    },
    fontWeight,
    colors,
    borderWidth,
    borderRadius,
    cursor,
    justify,
  },
  variantOrder: [
    "first",
    "last",
    "odd",
    "even",
    "visited",
    "checked",
    "empty",
    "read-only",
    "group-hover",
    "group-focus",
    "focus-within",
    "hover",
    "focus",
    "focus-visible",
    "active",
    "disabled",
  ],
  plugins: [],
};
export default config;
