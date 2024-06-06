import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Typography } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Base/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { children: "Example Klayr text" },
  argType: {
    fontWeight: { control: { type: 'select', options: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold"] } },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
    variant: "body",
  },
};

export const Display1: Story = {
  args: {
    variant: "display-1",
  }
}

export const Display2: Story = {
  args: {
    variant: "display-2",
  }
}

export const Heading1: Story = {
  args: {
    variant: "h1",
  }
}

export const Heading2: Story = {
  args: {
    variant: "h2",
  }
}

export const Heading3: Story = {
  args: {
    variant: "h3",
  }
}

export const Heading4: Story = {
  args: {
    variant: "h4",
  }
}

export const Heading5: Story = {
  args: {
    variant: "h5",
  }
}

export const Heading6: Story = {
  args: {
    variant: "h6",
  }
}

export const Subheading: Story = {
  args: {
    variant: "subheading",
  }
}

export const ParagraphSmall: Story = {
  args: {
    variant: "paragraph-sm",
  }
}

export const ParagraphMedium: Story = {
  args: {
    variant: "paragraph-md",
  }
}

export const ParagraphLarge: Story = {
  args: {
    variant: "paragraph-lg",
  }
}

export const ParagraphExtraLarge: Story = {
  args: {
    variant: "paragraph-xl",
  }
}

export const Footer: Story = {
  args: {
    variant: "footer",
  }
}

export const Caption: Story = {
  args: {
    variant: "caption",
  }
}

export const Code: Story = {
  args: {
    variant: "code",
  }
}