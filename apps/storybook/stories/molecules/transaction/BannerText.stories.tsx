import { BannerText } from "@repo/ui/molecules";
import { StoryObj } from '@storybook/react';

const meta = {
    title: 'Molecules/Transaction/BannerText',
    component: BannerText,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    };

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
       amount: 123456,
         symbol: "KLY",
         senderName: "Oliver",
            senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
            receiverName: "Alexandra",
            receiverAddress: "klyrt9e7q4v47e3622obxcj97veavxa2ak2ofyn32",
            moduleCommand: "token:transfer",
            executionStatus: "successful",
            timestamp: 1719841046,
            badgeColor: "green",
    },
};

export const NoReceiverName: Story = {
    args: {
        amount: 456,
          symbol: "KLY",
          senderName: "Oliver",
             senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
             receiverAddress: "klyrt9e7q4v47e3622obxcj97veavxa2ak2ofyn32",
             moduleCommand: "token:transfer",
             executionStatus: "successful",
             timestamp: 1719841046,
             badgeColor: "green",
     },
};

export const NoNames: Story = {
    args: {
        amount: 76,
          symbol: "KLY",
          
             senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
             receiverAddress: "klyrt9e7q4v47e3622obxcj97veavxa2ak2ofyn32",
             moduleCommand: "token:transfer",
             executionStatus: "successful",
             timestamp: 1719841046,
             badgeColor: "green",
     },
};

export const StakeFailed: Story = {
        args: {
            amount: 156,
              symbol: "KLY",
              senderName: "Oliver",
                 senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
                 moduleCommand: "pos:stake",
                 executionStatus: "failed",
                 timestamp: 1719841046,
                 badgeColor: "sand",
         },
    };