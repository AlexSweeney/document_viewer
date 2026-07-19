import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { titleAreaStyles } from "../../organisms/Header/Header.styles";
import { ThemeModeToggle } from ".";

const toggleAreaStyles: CSSProperties = {
  ...titleAreaStyles,
  width: "100%",
  justifyContent: "flex-end",
};

const meta = {
  title: "Atoms/ThemeModeToggle",
  component: ThemeModeToggle,
  tags: ["autodocs"],
  parameters: {
    appSurface: "header",
  },
  decorators: [
    (Story) => (
      <div style={toggleAreaStyles}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThemeModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
