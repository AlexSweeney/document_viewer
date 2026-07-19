import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeModeToggle } from ".";

const storyStyles = {
  alignItems: "center",
  backgroundColor: "#d9d9d9",
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: "2rem",
  minHeight: "7.5rem",
  width: "100%",
};

const meta = {
  title: "Atoms/ThemeModeToggle",
  component: ThemeModeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={storyStyles}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThemeModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
