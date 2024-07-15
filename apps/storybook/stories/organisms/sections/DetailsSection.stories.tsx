import type { StoryObj } from '@storybook/react';
import {DetailsSection} from "@repo/ui/organisms";
import {fromNowFormatter} from "@repo/ui/utils";
import {Currency, Typography, UserAccountCard} from "@repo/ui/atoms";

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
type Template = Omit<Story, "args">;

const Template: Template = {
  render: (args) => (
    <div className={"w-full p-5xl"}>
      <DetailsSection {...args} />
    </div>
  ),
}

export const Transactions: Story = {
  ...Template,
  args: {
    title: "Transaction details",
    data: [
      {
        label: {
          label: "Transaction ID",
        },
        value: "54558607de9ceb034596ed847a96d415f96ba3e03e6f1936843885d248993ad8",
      },
      {
        label: {
          label: "Module",
          tooltip: "The module that the transaction belongs to",
        },
        value: "Token",
      },
      {
        label: {
          label: "Command",
          tooltip: "The command that the transaction belongs to",
        },
        value: "Transfer",
      },
      {
        label: {
          label: "Date",
        },
        value: fromNowFormatter(1629782400000),
      },
      {
        label: {
          label: "Amount",
        },
        value: (
          <Typography>
            <Currency amount={342} symbol={"KLY"} />
            {" | "}
            <Currency amount={634.34} sign={"$"} />
          </Typography>
        ),
      },
      {
        label: {
          label: "Fee",
        },
        value: (
          <Typography>
            <Currency amount={0.123} decimals={4} symbol={"KLY"} />
            {" | "}
            <Currency amount={0.246} decimals={4} sign={"$"} />
          </Typography>
        ),
      },
      {
        label: {
          label: "Nonce",
        },
        value: 1,
      },
      {
        label: {
          label: "From",
        },
        value: <UserAccountCard address={"klyrwwsnngamakd64af7nnyod2zswvwtj7aka8fur"} name={"Duskhaze"} />
      },
      {
        label: {
          label: "To",
        },
        value: <UserAccountCard address={"klyrwwsnngamakd64af7nnyod2zswvwtj7aka8fur"} name={"Duskhaze"} />
      },
      {
        label: {
          label: "Sender Public Key",
        },
        value: "6f2798e176f11430d37acae152d49cd8876177f2ee132bfb5a6048f6b94efe28",
      },
      {
        label: {
          label: "Receiver Public Key",
        },
        value: "6f2798e176f11430d37acae152d49cd8876177f2ee132bfb5a6048f6b94efe28",
      },
      {
        label: {
          label: "Block",
        },
        value: "82758607de9ceb034596ed847a96d415f96ba3e03e6f1936843885d248993df7",
      },
      {
        label: {
          label: "Block Height",
        },
        value: 123456
      },
      {
        label: {
          label: "Blocks ago",
        },
        value: 21,
      },
      {
        label: {
          label: "Token",
        },
        value: "KLY",
      },
      {
        label: {
          label: "Chains",
        },
        value: "Klayr-mainchain -> Tokenfactory",
      },
      {
        label: {
          label: "Data",
        },
        value: "Created new token",
      },
    ]
  },
};