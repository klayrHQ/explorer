import type { StoryObj } from '@storybook/react';
import {Icon, KeyValueComponent, Typography} from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Data/KeyValueComponent',
  component: KeyValueComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPlainText: Story = {
  args: {
    keyValue: "MC",
    contentValue: "$27.324",
  },
};

export const WithValueComponent: Story = {
  args: {
    keyValue: "KLY",
    contentValue: (
        <span>
          {"$181.66"}
          <Typography color={"green"} variant={"paragraph-sm"}>
            <Icon className={"inline pb-1"} color={"inherit"} icon={"ChevronUp"} />
            {"0.3 %"}
          </Typography>
        </span>
    ),
  },
};