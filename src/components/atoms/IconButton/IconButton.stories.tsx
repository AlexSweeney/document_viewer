import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { IconButton } from ".";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    appSurface: "controls",
  },
  args: {
    ariaLabel: "Go back",
    icon: "leftChevron",
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NavigationButtons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <IconButton ariaLabel="Go back" icon="leftChevron" onClick={fn()} />
      <IconButton ariaLabel="Go forward" icon="rightChevron" onClick={fn()} />
      <IconButton ariaLabel="Go up" icon="upArrow" onClick={fn()} />
    </div>
  ),
};
