import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { DocumentPanelControls } from ".";

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date created" },
  { value: "type", label: "File type" },
];

const meta = {
  title: "Organisms/DocumentPanel/parts/Controls",
  component: DocumentPanelControls,
  tags: ["autodocs"],
  args: {
    filterValue: "",
    sortOptions,
    sortValue: "name",
    onBackClick: fn(),
    onForwardClick: fn(),
    onSortDirectionClick: fn(),
    onFilterChange: fn(),
    onSortChange: fn(),
  },
} satisfies Meta<typeof DocumentPanelControls>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NavigationDisabled: Story = {
  args: {
    isBackDisabled: true,
    isForwardDisabled: true,
  },
};
