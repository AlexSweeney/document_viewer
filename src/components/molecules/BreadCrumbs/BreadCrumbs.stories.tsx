import type { Meta, StoryObj } from "@storybook/react-vite";
import { BreadCrumbs } from ".";

const meta = {
  title: "Molecules/BreadCrumbs",
  component: BreadCrumbs,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "Home" },
      { label: "Expenses" },
      { label: "Travel" },
      { label: "2024" },
    ],
  },
} satisfies Meta<typeof BreadCrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleItem: Story = {
  args: {
    items: [{ label: "Home" }],
  },
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: "Home" },
      { label: "Misc" },
      { label: "Archive" },
      { label: "Legacy policies" },
      { label: "Dress code 2014" },
    ],
  },
};
