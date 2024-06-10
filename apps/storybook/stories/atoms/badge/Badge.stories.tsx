import type { StoryObj } from '@storybook/react';
import { Badge } from '@repo/ui/atoms';

const meta = {
    title: 'Atoms/Badge/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        label: "Example Badge",
    },
    argTypes: {
        colorVariant: { control: { type: 'select', options: ["volt", "azule", "lobster", "sand", "tulip", "green"] } },
    }
}; 

export default meta;
type Story = StoryObj<typeof meta>;


export const DevelopmentBadge: Story = {
    args: {
        colorVariant: "volt",
        label: "Development",
    },
};

export const MarketingBadge: Story = {
    args: {
        colorVariant: "azule",
        label: "Marketing",
    },
};

export const BlockchainBadge: Story = {
    args: {
        colorVariant: "lobster",
        label: "Blockchain",
    },
};

export const NFTBadge: Story = {
    args: {
        colorVariant: "sand",
        label: "NFTs",
    },
};

export const DesignBadge: Story = {
    args: {
        colorVariant: "green",
        label: "Design",
    },
};