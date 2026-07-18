import type { Meta, StoryObj } from "@storybook/react-vite";
import { SortDirectionButton, sortDirections } from ".";

const meta = {
  title: "Atoms/SortDirectionButton",
  component: SortDirectionButton,
  tags: ["autodocs"],
  argTypes: {
    defaultDirection: {
      control: "select",
      options: sortDirections,
    },
  },
  args: {
    defaultDirection: "asc",
    ariaLabel: "Sort by name",
  },
} satisfies Meta<typeof SortDirectionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StartingDescending: Story = {
  args: {
    defaultDirection: "desc",
  },
};
