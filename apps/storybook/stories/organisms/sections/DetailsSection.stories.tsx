import type { StoryObj } from '@storybook/react';
import { DetailsSection } from '@repo/ui/organisms';
import {
  ChainToChainComponent,
  Currency,
  DateComponent,
  FlexGrid,
  Icon,
  ImageContainer,
  KeyValueComponent,
  Typography,
  UserAccountCard,
} from '@repo/ui/atoms';
import { DefaultImageComponent } from '@/stories/utils/constants';
import Logo from '@/stories/assets/images/logo.svg';

const meta = {
  title: 'Organisms/Sections/DetailsSection',
  component: DetailsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, 'args'>;

const Template: Template = {
  render: (args) => (
    <div className={'w-full p-5xl'}>
      <DetailsSection {...args} />
    </div>
  ),
};

export const Transactions: Story = {
  ...Template,
  args: {
    title: 'Transaction details',
    data: [
      {
        label: {
          label: 'Transaction ID',
        },
        value: '54558607de9ceb034596ed847a96d415f96ba3e03e6f1936843885d248993ad8',
      },
      {
        label: {
          label: 'Module',
          tooltip: 'The module that the transaction belongs to',
        },
        value: 'Token',
        mobileWidth: 'half',
      },
      {
        label: {
          label: 'Command',
          tooltip: 'The command that the transaction belongs to',
        },
        value: 'Transfer',
        mobileWidth: 'half',
      },
      {
        label: {
          label: 'Date',
        },
        value: <DateComponent confirmationTime={2} timestamp={1721295081000} variant={'full'} />,
      },
      {
        label: {
          label: 'Amount',
        },
        value: (
          <Currency
            amount={34200000000}
            className={'truncate max-w-full'}
            marketValue={634.34}
            symbol={'KLY'}
          />
        ),
        mobileWidth: 'half',
      },
      {
        label: {
          label: 'Fee',
        },
        value: (
          <Currency
            amount={12300000}
            className={'truncate max-w-full'}
            decimals={4}
            marketValue={0.246}
            symbol={'KLY'}
          />
        ),
        mobileWidth: 'half',
      },
      {
        label: {
          label: 'Nonce',
        },
        value: 1,
      },
      {
        label: {
          label: 'From',
        },
        value: (
          <UserAccountCard
            address={'klyrwwsnngamakd64af7nnyod2zswvwtj7aka8fur'}
            name={'Duskhaze'}
          />
        ),
        mobileWidth: 'half',
      },
      {
        label: {
          label: 'To',
        },
        value: (
          <UserAccountCard
            address={'klyrwwsnngamakd64af7nnyod2zswvwtj7aka8fur'}
            name={'Duskhaze'}
          />
        ),
        mobileWidth: 'half',
      },
      {
        label: {
          label: 'Sender Public Key',
        },
        value: '6f2798e176f11430d37acae152d49cd8876177f2ee132bfb5a6048f6b94efe28',
      },
      {
        label: {
          label: 'Receiver Public Key',
        },
        value: '6f2798e176f11430d37acae152d49cd8876177f2ee132bfb5a6048f6b94efe28',
      },
      {
        label: {
          label: 'Block',
        },
        value: '82758607de9ceb034596ed847a96d415f96ba3e03e6f1936843885d248993df7',
      },
      {
        label: {
          label: 'Block Height',
        },
        value: 123456,
      },
      {
        label: {
          label: 'Blocks ago',
        },
        value: 21,
      },
      {
        label: {
          label: 'Token',
        },
        value: (
          <KeyValueComponent
            keyValue={
              <ImageContainer
                alt={'token logo'}
                component={DefaultImageComponent}
                src={Logo.src}
                variant={'chainLogo'}
              />
            }
            contentValue={<Typography variant={'paragraph-lg'}>{'KLY'}</Typography>}
          />
        ),
      },
      {
        label: {
          label: 'Chains',
        },
        value: (
          <ChainToChainComponent
            from={{ logo: Logo.src, name: 'Klayr-mainchain' }}
            to={{ logo: Logo.src, name: 'Tokenfactory' }}
            imageComponent={DefaultImageComponent}
          />
        ),
      },
      {
        label: {
          label: 'Data',
        },
        value: 'Created new token',
      },
    ],
  },
};
