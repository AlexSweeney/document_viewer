import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { BreadCrumbs } from ".";

const breadCrumbItem = (label: string) => ({
  label,
  onClick: fn(),
});

const meta = {
  title: "Molecules/BreadCrumbs",
  component: BreadCrumbs,
  tags: ["autodocs"],
  args: {
    items: [
      breadCrumbItem("Home"),
      breadCrumbItem("Expenses"),
      breadCrumbItem("Travel"),
      breadCrumbItem("2024"),
    ],
  },
} satisfies Meta<typeof BreadCrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleItem: Story = {
  args: {
    items: [breadCrumbItem("Home")],
  },
};

export const DeepPath: Story = {
  args: {
    items: [
      breadCrumbItem("Home"),
      breadCrumbItem("Misc"),
      breadCrumbItem("Archive"),
      breadCrumbItem("Legacy policies"),
      breadCrumbItem("Dress code 2014"),
    ],
  },
};
