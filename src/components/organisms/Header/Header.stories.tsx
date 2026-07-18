import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Header } from ".";

const meta = {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
  args: {
    breadCrumbItems: [
      { label: "Home" },
      { label: "Expenses" },
      { label: "Travel" },
    ],
    onClickBreadCrumb: fn(),
    title: "Document viewer",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleBreadCrumb: Story = {
  args: {
    breadCrumbItems: [{ label: "Home" }],
    title: "Document viewer",
  },
};

export const DeepPath: Story = {
  args: {
    breadCrumbItems: [
      { label: "Home" },
      { label: "Misc" },
      { label: "Archive" },
      { label: "Legacy policies" },
    ],
    title: "Document viewer",
  },
};
