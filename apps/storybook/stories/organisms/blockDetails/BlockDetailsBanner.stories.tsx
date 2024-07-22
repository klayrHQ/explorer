import { StoryObj } from '@storybook/react';
import { BlockDetailsBanner } from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';

const meta = {
  title: 'Organisms/BlockDetails/BlockDetailsBanner',
  component: BlockDetailsBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    generatorName: 'Alex303',
    image: BannerBG.src,
    reward: '354',
    symbol: 'KLY',
    generatorAddress: 'klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8',
    numberOfTransactions: 5,
    height: 132443,
    isFinal: true,
  },
};

export const FailedExecution: Story = {
  args: {
    generatorName: 'Alex303',
    image: BannerBG.src,
    reward: '354',
    symbol: 'KLY',
    generatorAddress: 'klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8',
    isFinal: false,
    numberOfTransactions: 32,
    height: 132443,
  },
};

export const NoTransactions: Story = {
  args: {
    generatorName: 'Alex303',
    image: BannerBG.src,
    reward: '354',
    symbol: 'KLY',
    generatorAddress: 'klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8',
    isFinal: true,
    numberOfTransactions: 0,
    height: 132443,
  },
};

export const NoGeneratorName: Story = {
  args: {
    generatorName: '',
    image: BannerBG.src,
    reward: '354',
    symbol: 'KLY',
    generatorAddress: 'klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8',
    isFinal: true,
    numberOfTransactions: 5,
    height: 132443,
  },
};
