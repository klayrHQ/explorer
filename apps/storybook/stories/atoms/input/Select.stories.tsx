// src/stories/Select.stories.tsx

import { StoryObj } from '@storybook/react';
import { CustomSelect } from '@repo/ui/atoms'; 

const meta = {
  title: 'Atoms/Input/CustomSelect',
  component: CustomSelect,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    iconPosition: {
      control: {
        type: 'select',
        options: ['left', 'right', 'none'],
      },
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Default = {
    args: {
        options: [
            { value: 'oneHourAgo', label: 'One hour ago', labelIcon: 'Heart' },
            { value: 'yesterday', label: 'Yesterday', labelIcon: 'LayersThree' },
            { value: 'lastWeek', label: 'Last week' },
            { value: 'lastMonth', label: 'Last month' },
            { value: 'lastYear', label: 'Last year' },
        ],
        disabled: false,
        iconPosition: 'none',
        defaultValue: 'lastWeek',
        },
    }




export const LeftIcon = {
    args : {
        options: [
          { value: 'testnet', label: 'Testnet' },
          { value: 'mainnet', label: 'Mainnet' },
        ],
        disabled: false,
        iconPosition: 'left',
        defaultValue: 'testnet',
      },
}


export const RightIcon = {
    args : {
        options: [
          { value: 'testnet', label: 'Testnet' },
            { value: 'mainnet', label: 'Mainnet' },
        ],
        disabled: false,
        iconPosition: 'right',
        },
}
