import {TabButtons}  from '@repo/ui/atoms';
import { StoryObj } from '@storybook/react';

const meta = {
    title: 'Atoms/Input/TabButtons',
    component: TabButtons,
    parameters: {
        layout: 'centered',
    },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tabs: [
            { label: 'Details', value: 1, icon: 'InfoSquare', content: 'Tab 1 Content'},
            { label: 'Events', value: 2, icon: 'List', content: 'Tab 2 Content'},
           
        ],
    },
};