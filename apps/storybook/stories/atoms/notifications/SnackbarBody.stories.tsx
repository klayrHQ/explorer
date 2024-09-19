import type { StoryObj } from '@storybook/react';
import { SnackbarBody } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Notifications/NotificationIcon',
  component: SnackbarBody,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    title: 'Removal successful',
    text: 'You successfully removed Moosty from your favorites.',
    variant: 'success',
    handleClose: () => alert('Closed'),
  },
};

export const Error: Story = {
  args: {
    title: 'Error',
    text: 'This is an error message.',
    variant: 'error',
    handleClose: () => alert('Closed'),
  },
};

export const Alert: Story = {
  args: {
    title: 'Alert',
    text: 'This is an alert message.',
    variant: 'alert',
    handleClose: () => alert('Closed'),
  },
};

export const Info: Story = {
  args: {
    title: 'Info',
    text: 'This is an info message.',
    variant: 'info',
    handleClose: () => alert('Closed'),
  },
};
