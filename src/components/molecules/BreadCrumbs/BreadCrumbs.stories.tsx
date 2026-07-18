import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { BreadCrumbs } from ".";

const breadcrumbItem = (label: string) => ({
  label,
  onClick: fn(),
});

const meta = {
  title: "Molecules/BreadCrumbs",
  component: BreadCrumbs,
  tags: ["autodocs"],
  args: {
    items: [
      breadcrumbItem("Home"),
      breadcrumbItem("Expenses"),
      breadcrumbItem("Travel"),
      breadcrumbItem("2024"),
    ],
  },
} satisfies Meta<typeof BreadCrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleItem: Story = {
  args: {
    items: [breadcrumbItem("Home")],
  },
};

export const DeepPath: Story = {
  args: {
    items: [
      breadcrumbItem("Home"),
      breadcrumbItem("Misc"),
      breadcrumbItem("Archive"),
      breadcrumbItem("Legacy policies"),
      breadcrumbItem("Dress code 2014"),
    ],
  },
};
