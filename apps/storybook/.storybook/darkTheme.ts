import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',
  brandTitle: 'Klayr Dark Theme',
  brandUrl: 'https://klayr.xyz',
  brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
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
});