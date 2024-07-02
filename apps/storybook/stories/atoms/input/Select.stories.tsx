import { StoryObj } from '@storybook/react';
import { CustomSelect } from '@repo/ui/atoms'; 

const meta = {
  title: 'Atoms/Input/Select',
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
    width: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg', 'xl'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Stats: Story = {
  args: {
    options: [
      { value: 'oneHourAgo', label: 'One hour ago' },
      { value: 'yesterday', label: 'Yesterday'},
      { value: 'lastWeek', label: 'Last week'},
      { value: 'lastMonth', label: 'Last month' },
      { value: 'lastYear', label: 'Last year', },
    ],
   
  
    defaultValue: 'lastMonth',
    width: 'md',
    backgroundColor: 'darkBlue'
  },
};

export const Network: Story = {
  args: {
    options: [
      { value: 'testnet', label: 'Testnet', labelCircleColor: 'green' },
      { value: 'mainnet', label: 'Mainnet', labelCircleColor: 'lobster' },
    
    ],
  
  
    defaultValue: 'testnet',
    width: 'xl',
  },
};

export const Chain: Story = {
  args: {
    options: [
      { value: 'klayr', label: 'Klayr-main', labelImage: 'https://explorer.klayr.dev/_next/static/media/logo.f350e9f3.svg' },
      { value: 'mainnet', label: 'Mainnet', labelImage: 'https://placekitten.com/200/300' },
    ],
  
    defaultValue: 'klayr',
   
    width: 'xl',
  },
};

export const Icon: Story = {
    args: {
        options: [
            { value: 'favorite', label: 'Favorite', labelIcon: 'Heart' },
            { value: 'users', label: 'Users', labelIcon: 'Users' },
            { value: 'settings', label: 'Settings', labelIcon: 'Settings' },
        ],
      
        defaultValue: 'settings',
         
        width: 'sm',
        },
};
