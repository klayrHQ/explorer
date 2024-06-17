import type { StoryObj } from '@storybook/react';
import {Topbar} from "@repo/ui/organisms";
import {Icon, Typography} from "@repo/ui/atoms";

const meta = {
  title: 'Organisms/Layout/Topbar',
  component: Topbar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const kpis = [
  {
    keyValue: "KLY",
    contentValue: (
        <span>
          {"$181.66"}
          <span className={"text-green"}>
            <Icon className={"inline pb-1 text-footer"} color={"inherit"} icon={"ChevronUp"}/>
            {"0.3 %"}
          </span>
        </span>
    ),
  },
  {
    keyValue: "MC",
    contentValue: "$27.324",
  },
];

export const Default: Story = {
  args: {
    kpis,
  },
};
