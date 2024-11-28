import type { StoryObj } from '@storybook/react';
import {CurrencySetting} from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Settings/CurrencySetting',
  component: CurrencySetting,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, 'args'>;

const Template: Template = {
  render: (args) => (
    <div className={'w-[250px] bg-backgroundSecondary p-3xl'}>
      <CurrencySetting {...args} />
    </div>
  ),
}

export const Default: Story = {
  ...Template,
  args: {
    label: 'Euro',
    sign: '€',
    symbol: 'EUR',
  },
};

export const Selected: Story = {
  ...Template,
  args: {
    label: 'Euro',
    sign: '€',
    symbol: 'EUR',
    selected: true,
  },
};