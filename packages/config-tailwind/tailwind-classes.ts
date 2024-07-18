const borderWidth = {
  DEFAULT: '1px',
  0: '0px',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
  none: 'none',
};

const borderRadius = {
  none: '0px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  DEFAULT: '8px',
  lg: '10px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '40px',
  full: '9999px',
};

const colors = {
  transparent: 'transparent',
  primary: 'var(--color-volt)',
  onPrimary: 'var(--color-gray-8)',
  secondary: 'var(--color-azule)',
  onSecondary: 'var(--color-gray-1)',
  background: 'var(--color-background)',
  backgroundPrimary: 'var(--color-backgroundPrimary)',
  backgroundSecondary: 'var(--color-backgroundSecondary)',
  backgroundTertiary: 'var(--color-backgroundTertiary)',
  backgroundDark: 'var(--color-backgroundDark)',
  backgroundLight: 'var(--color-backgroundLight)',
  onBackgroundHigh: 'var(--color-onBackgroundHigh)',
  onBackgroundMediumHigh: 'var(--color-onBackgroundMediumHigh)',
  onBackgroundMedium: 'var(--color-onBackgroundMedium)',
  onBackgroundLow: 'var(--color-onBackgroundLow)',
  onBackground: 'var(--color-onBackground)',
  onBackgroundDark: 'var(--color-onBackgroundDark)',
  onBackgroundLight: 'var(--color-onBackgroundLight)',
  onMenuHigh: 'var(--color-onMenuHigh)',
  onMenuMedium: 'var(--color-onMenuMedium)',
  onMenuLow: 'var(--color-onMenuLow)',
  onMenu: 'var(--color-onMenu)',
  borderLow: 'var(--color-borderLow)',
  borderMedium: 'var(--color-borderMedium)',
  borderHigh: 'var(--color-borderHigh)',
  error: 'var(--color-error)',
  errorBg: 'var(--color-errorBg)',
  warning: 'var(--color-warning)',
  warningBg: 'var(--color-warningBg)',
  success: 'var(--color-success)',
  successBg: 'var(--color-successBg)',
  volt: 'var(--color-volt)',
  voltDark: 'var(--color-voltDark)',
  azule: 'var(--color-azule)',
  azuleDark: 'var(--color-azuleDark)',
  lobster: 'var(--color-lobster)',
  lobsterDark: 'var(--color-lobsterDark)',
  sand: 'var(--color-sand)',
  sandDark: 'var(--color-sandDark)',
  tulip: 'var(--color-tulip)',
  tulipDark: 'var(--color-tulipDark)',
  green: 'var(--color-green)',
  greenDark: 'var(--color-greenDark)',
  black: 'var(--color-black)',
  white: 'var(--color-white)',
  greenOpacity: 'var(--color-greenOpacity)',
  redOpacity: 'var(--color-redOpacity)',
  darkBlue: 'var(--color-darkBlue)',
  'gray-1': 'var(--color-gray-1)',
  'gray-2': 'var(--color-gray-2)',
  'gray-3': 'var(--color-gray-3)',
  'gray-4': 'var(--color-gray-4)',
  'gray-5': 'var(--color-gray-5)',
  'gray-6': 'var(--color-gray-6)',
  'gray-7': 'var(--color-gray-7)',
  'gray-8': 'var(--color-gray-8)',
  'shadow-gray-1': 'var(--color-shadow-gray-1)',
  'shadow-gray-2': 'var(--color-shadow-gray-2)',
  'shadow-gray-3': 'var(--color-shadow-gray-3)',
  'shadow-gray-4': 'var(--color-shadow-gray-4)',
  'shadow-gray-5': 'var(--color-shadow-gray-5)',
  'shadow-gray-6': 'var(--color-shadow-gray-6)',
  'shadow-gray-7': 'var(--color-shadow-gray-7)',
  'shadow-gray-8': 'var(--color-shadow-gray-8)',
};

const fontSize = {
  body: ['16px', { lineHeight: '22px' }],
  'display-1': ['72px', { lineHeight: '86px' }],
  'display-2': ['60px', { lineHeight: '76px' }],
  'heading-1': ['48px', { lineHeight: '60px' }],
  'heading-2': ['39px', { lineHeight: '50px' }],
  'heading-3': ['33px', { lineHeight: '42px' }],
  'heading-4': ['28px', { lineHeight: '36px' }],
  'heading-5': ['22px', { lineHeight: '28px' }],
  'heading-6': ['18px', { lineHeight: '25px' }],
  subheading: ['20px', { lineHeight: '26px' }],
  'paragraph-xl': ['21px', { lineHeight: '30px' }],
  'paragraph-lg': ['18px', { lineHeight: '26px' }],
  'paragraph-md': ['16px', { lineHeight: '22px' }],
  'paragraph-sm': ['14px', { lineHeight: '20px' }],
  footer: ['10px', { lineHeight: '16px' }],
  caption: ['12px', { lineHeight: '18px' }],
  'icon-xl': ['32px'],
  'icon-md': ['24px'],
  'icon-sm': ['20px'],
  'icon-xs': ['16px'],
  'icon-xxs': ['12px'],
  logo: ['34px', { lineHeight: '39px' }],
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
};

const spacing = {
  px: '1px',
  '2xs': '2px',
  '2.5xs': '2.5px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '10px',
  lxl: '12px',
  xl: '14px',
  '1.5xl': '16px',
  '2xl': '20px',
  '3xl': '24px',
  '4xl': '32px',
  '4.5xl': '36px',
  '5xl': '48px',
  sidebarMinSpacing: '22px',
};

const screens = {
  desktop: '1024px',
  tablet: '440px',
  mobile: { max: '439px' },
  sidebarBp: { raw: '(max-height: 800px)' },
};

const display = {
  block: null,
  'inline-block': null,
  inline: null,
  flex: null,
  'inline-flex': null,
  table: null,
  'inline-table': null,
  'table-caption': null,
  'table-cell': null,
  'table-column': null,
  'table-column-group': null,
  'table-footer-group': null,
  'table-header-group': null,
  'table-row-group': null,
  'table-row': null,
  'flow-root': null,
  grid: null,
  'inline-grid': null,
  contents: null,
  'list-item': null,
  hidden: null,
  'flex-row': null,
  'flex-row-reverse': null,
  'flex-col': null,
  'flex-col-reverse': null,
};

const overflow = {
  auto: 'auto',
  hidden: 'hidden',
  visible: 'visible',
  scroll: 'scroll',
};

const percentages = {
  '10p': '10%',
  '20p': '20%',
  '30p': '30%',
  '40p': '40%',
  '50p': '50%',
  '60p': '60%',
  '70p': '70%',
  '80p': '80%',
  '90p': '90%',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  full: '100%',
};

const cursor = {
  auto: 'auto',
  default: 'default',
  pointer: 'pointer',
  wait: 'wait',
  text: 'text',
  move: 'move',
  help: 'help',
  'not-allowed': 'not-allowed',
  none: 'none',
  'context-menu': 'context-menu',
  progress: 'progress',
  cell: 'cell',
  crosshair: 'crosshair',
  'vertical-text': 'vertical-text',
  alias: 'alias',
  copy: 'copy',
  'no-drop': 'no-drop',
  grab: 'grab',
  grabbing: 'grabbing',
  'all-scroll': 'all-scroll',
  'col-resize': 'col-resize',
  'row-resize': 'row-resize',
  'n-resize': 'n-resize',
  'e-resize': 'e-resize',
  's-resize': 's-resize',
  'w-resize': 'w-resize',
  'ne-resize': 'ne-resize',
  'nw-resize': 'nw-resize',
  'se-resize': 'se-resize',
  'sw-resize': 'sw-resize',
  'ew-resize': 'ew-resize',
  'ns-resize': 'ns-resize',
  'nesw-resize': 'nesw-resize',
  'nwse-resize': 'nwse-resize',
  'zoom-in': 'zoom-in',
  'zoom-out': 'zoom-out',
};

const leading = {
  'leading-3': null,
  'leading-4': null,
  'leading-5': null,
  'leading-6': null,
  'leading-7': null,
  'leading-8': null,
  'leading-9': null,
  'leading-10': null,
  'leading-none': null,
  'leading-tight': null,
  'leading-snug': null,
  'leading-normal': null,
  'leading-relaxed': null,
  'leading-loose': null,
};

const height = {
  screen: '100vh',
  screenUnderTopbar: 'calc(100vh - 88px)',
  screenUnderTopbarMobile: 'calc(100vh - 76px)',
  full: '100%',
  max: 'max-content',
  min: 'min-content',
  buttonHeight: '40px',
  inputHeight: '44px',
  badgeHeight: '26px',
  newsCardHeight: '240px',
  newsCardContainerHeight: '424px',
  newsCardContainerMobileHeight: '324px',
  newsCardMobileHeight: '160px',
  menuItemHeight: '48px',
  menuItemSmallHeight: '34px',
  logoImgHeight: '24px',
  topbarHeight: '88px',
  topbarMobileHeight: '76px',
  chainLogoHeight: '16px',
  avatarHeight: '24px',
  avatarMdHeight: '30px',
  avatarLgHeight: '40px',
  trHeight: '72px',
  thHeight: '44px',
};

const width = {
  screen: '100vw',
  full: '100%',
  max: 'max-content',
  min: 'min-content',
  app: '1136px',
  menuIconWidth: '24px',
  menuIconSmallWidth: '16px',
  iconButtonWidth: '40px',
  sidebarWidth: '240px',
  sidebarMinWidth: '88px',
  minimizedMenuItemWidth: '48px',
  logoImgWidth: '24px',
  newsCardWidth: '362px',
  newsCardMobileWidth: '382px',
  performanceCardWidth: '208px',
  performanceCardMobileWidth: '183px',
  searchBarWidth: '600px',
  chainLogoWidth: '16px',
  avatarWidth: '24px',
  avatarMdWidth: '30px',
  avatarLgWidth: '40px',
  selectXLWidth: '384px',
  selectSMWidth: '222px',
  modalWidth: '544px',
  modalWidthMobile: '382px',
  transitionBannerWidth: '1136px',
  transitionBannerWidthMobile: '382px',
  transitionBannerContainerWidth: '700px',
  transitionBannerContainerWidthMobile: '334px',
  detailsLabelWidth: 'max(15%, 160px)',
};

const lineClamp = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  none: 'none',
};

const shadow = {
  md: 'var(--shadow-md)',
  below: 'var(--shadow-below)',
};

const justify = {
  normal: 'normal',
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  stretch: 'stretch',
};

const gridCols = {
  1: 'repeat(1, minmax(0, 1fr))',
  2: 'repeat(2, minmax(0, 1fr))',
  3: 'repeat(3, minmax(0, 1fr))',
  4: 'repeat(4, minmax(0, 1fr))',
  5: 'repeat(5, minmax(0, 1fr))',
  6: 'repeat(6, minmax(0, 1fr))',
  7: 'repeat(7, minmax(0, 1fr))',
  8: 'repeat(8, minmax(0, 1fr))',
  9: 'repeat(9, minmax(0, 1fr))',
  10: 'repeat(10, minmax(0, 1fr))',
  11: 'repeat(11, minmax(0, 1fr))',
  12: 'repeat(12, minmax(0, 1fr))',
  none: 'none',
  subgrid: 'subgrid',
};

const autoCols = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr: 'minmax(0, 1fr)',
};

const transition = {
  none: null,
  all: null,
  DEFAULT: null,
};

const duration = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
};

const ease = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const position = {
  static: 'static',
  clip: 'clip',
  fixed: 'fixed',
  absolute: 'absolute',
  relative: 'relative',
  sticky: 'sticky',
};

const zIndex = {
  auto: 'auto',
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
};

const whitespace = {
  normal: 'normal',
  nowrap: 'nowrap',
  pre: 'pre',
  'pre-line': 'pre-line',
  'pre-wrap': 'pre-wrap',
};

const shrink = {
  0: 0,
  DEFAULT: 1,
};

const grow = {
  0: 0,
  DEFAULT: 1,
};

const objectFit = {
  cover: 'cover',
  contain: 'contain',
  fill: 'fill',
  none: 'none',
  'scale-down': 'scale-down',
};

const colSpan = {
  auto: 'auto',
  'span-1': 'span 1 / span 1',
  'span-2': 'span 2 / span 2',
  'span-3': 'span 3 / span 3',
  'span-4': 'span 4 / span 4',
  'span-5': 'span 5 / span 5',
  'span-6': 'span 6 / span 6',
  'span-7': 'span 7 / span 7',
  'span-8': 'span 8 / span 8',
  'span-9': 'span 9 / span 9',
  'span-Full': '1 / -1',
};

const alignItems = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch',
};

const textAlign = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
  start: 'start',
  end: 'end',
};

const animate = {
  none: 'none',
  spin: 'spin',
  ping: 'ping',
  pulse: 'pulse',
  bounce: 'bounce',
};

const textOverflow = {
  truncate: null,
  'text-ellipsis': null,
  'text-clip': null,
};

const rotate = {
  0: '0deg',
  45: '45deg',
  90: '90deg',
  180: '180deg',
  270: '270deg',
};

export const classes = {
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
  alignItems,
  textAlign,
  animate,
  textOverflow,
  rotate,
};
