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
    keyValue: "MC: ",
    contentValue: "$27.324",
  },
};

export const WithValueComponent: Story = {
  args: {
    keyValue: "KLY: ",
    contentValue: (
      <Typography className={"inline-flex items-center"} color={"gray-5"} variant={"paragraph-sm"}>
        {"$181.66"}
        <span className={"text-green text-paragraph-sm inline-flex items-center"}>
          <Icon className={"inline pb-1"} color={"inherit"} icon={"ChevronUp"} />
          {"0.3 %"}
        </span>
      </Typography>
    ),
  },
};