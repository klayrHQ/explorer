import type { StoryObj } from '@storybook/react';
import { CurrencyPicker } from '@repo/ui/molecules';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Settings/CurrencyPicker',
  component: CurrencyPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, 'args'>;

const currencies = [
  {
    label: 'Euro',
    sign: '€',
    symbol: 'EUR',
  },
  {
    label: 'Dollar',
    sign: '$',
    symbol: 'USD',
  },
  {
    label: 'Pound',
    sign: '£',
    symbol: 'GBP',
  },
  {
    label: 'Yen',
    sign: '¥',
    symbol: 'JPY',
  },
  {
    label: 'Won',
    sign: '₩',
    symbol: 'KRW',
  },
  {
    label: 'Rupee',
    sign: '₹',
    symbol: 'INR',
  },
];

const Template: Template = {
  render: (args) => {
    const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>(
      args.selectedCurrency,
    );
    return (
      <div className={'w-[550px] bg-backgroundSecondary p-3xl'}>
        <CurrencyPicker
          {...args}
          selectedCurrency={selectedCurrency}
          onSelectCurrency={setSelectedCurrency}
        />
      </div>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    currencies,
  },
};

export const Selected: Story = {
  ...Template,
  args: {
    currencies,
    selectedCurrency: currencies[0].label,
  },
};
