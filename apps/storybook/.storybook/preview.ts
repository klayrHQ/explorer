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

  tags: ["autodocs"]
};

export default preview;
