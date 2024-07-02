import { ImageName } from "@repo/ui/molecules";
import { StoryObj } from "@storybook/react";

const meta = {
    title: "Molecules/Transaction/ImageName",
    component: ImageName,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        src: { control: "text" },
        alt: { control: "text" },
        variant: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        imageUrl: "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
        name: "John Doe",
    },
};

