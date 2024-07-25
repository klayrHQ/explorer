import type { StoryObj } from '@storybook/react';
import { JsonViewer } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Data/JsonViewer',
  component: JsonViewer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockJson = {
  id:"139a5e52692c3f5897b954995ec90d2d78f36dd96489ff12a5a1b57d02c7931d",
  moduleCommand:"pos:stake",
  nonce:"0",
  fee:"151000",
  minFee:"151000",
  size:151,
  block:{
    id:"5067a29634bfc9ac744f24b95e1a58534250dc49e7a7fd597990b5e3c8c02e0c",
    height:353313,
    timestamp:1721812295,
    isFinal:true,
  },
  sender:{
    address:"kly9mphnwb4bqrkve66smau8otnhqpbvhposc577h",
    publicKey:"78e7219607cbe5517a7d4bae7075dce4c8f4d8f5d2077052cb4d907ccfa7cc3d",
    name:null,
  },
  params:{
    stakes:[
      {
        validatorAddress:"kly9un3crrxx6r7wg9woqkav8brwarnfakakct2q8",
        amount:"195000000000",
      },
    ],
  },
  params2:{
    stakes:[
      {
        validatorAddress:"kly9un3crrxx6r7wg9woqkav8brwarnfakakct2q8",
        amount:"195000000000",
      },
    ],
  },
  signatures:[
    "91cba908c158d079aae3a475c6bf5322a814b1c53fe05381458add8f519f17de73ca3d6d8273671aa1392da9ec2f70b4c2d15b796c01bb573a2ef242331d1b01"
  ],
  executionStatus:"successful",
  index:0,
}

export const Default: Story = {
  args: {
    data: mockJson,
  },
};

export const WithCopy: Story = {
  args: {
    data: mockJson,
    copy: true,
  },
};

export const StartOpen: Story = {
  args: {
    data: mockJson,
    startOpen: true,
  },
};