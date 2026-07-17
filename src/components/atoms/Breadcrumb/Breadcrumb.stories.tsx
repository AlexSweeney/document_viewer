import type { Meta, StoryObj } from "@storybook/react-vite";
import { BreadCrumb } from ".";

const meta = {
  title: "Atoms/BreadCrumb",
  component: BreadCrumb,
  tags: ["autodocs"],
  args: {
    label: "Expenses",
  },
} satisfies Meta<typeof BreadCrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
