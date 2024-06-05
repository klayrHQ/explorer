import { create } from '@storybook/theming/create';
import klayrV3Resized from '../stories/assets/klayr-v3-resized.png';

export default create({
  base: 'dark',
  brandTitle: 'Klayr Dark Theme',
  brandUrl: 'https://klayr.xyz',
  brandImage: klayrV3Resized,
  brandTarget: '_self',

  fontBase: '"Utendo", "Open Sans", sans-serif',
  fontCode: 'monospace',

  colorPrimary: '#D4FF00',
  colorSecondary: '#0D75FD',

  // UI
  appBg: '#0C111D',
  appContentBg: '#0C111D',
  appPreviewBg: '#0C111D',
  appBorderColor: '#1F242F',
  appBorderRadius: 4,

  // Toolbar default and active colors
  barTextColor: '#ffffff',
  barSelectedColor: '#0D75FD',
  barHoverColor: '#0D75FD',
  barBg: '#0C111D',
});