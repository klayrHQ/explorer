import type { Preview } from "@storybook/react";
import "../app/globals.css";
import "@repo/ui/styles.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "klayrDark",
      values: [
        {
          name: "klayrDark",
          value: "#0C111D"
        },
        {
          name: "klayrLight",
          value: "#FFFFFF"
        },
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story, context) => {
      const bgDefault = "#0C111D";
      const bg = context?.globals?.backgrounds?.value;
      if (bg === bgDefault) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      return story();
    },
  ],
  tags: ["autodocs"]
};

export default preview;
