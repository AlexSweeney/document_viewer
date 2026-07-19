import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { BreadCrumb } from ".";

const meta = {
  title: "Atoms/BreadCrumb",
  component: BreadCrumb,
  tags: ["autodocs"],
  parameters: {
    appSurface: "header",
  },
  args: {
    label: "Expenses",
    onClick: fn(),
  },
} satisfies Meta<typeof BreadCrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
