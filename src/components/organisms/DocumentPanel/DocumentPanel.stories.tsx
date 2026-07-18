import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { DocumentPanel } from ".";

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date created" },
  { value: "type", label: "File type" },
];

const meta = {
  title: "Organisms/DocumentPanel",
  component: DocumentPanel,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "24rem" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      { name: "Employee Handbook", type: "pdf", dateCreated: "2017-01-06" },
      { name: "Q4 Report", type: "xlsx", dateCreated: "2018-03-12" },
      { name: "Documents", type: "folder", dateCreated: "2016-11-02" },
    ],
    filterValue: "",
    sortOptions,
    onBackClick: fn(),
    onForwardClick: fn(),
    onSortDirectionClick: fn(),
    onFilterChange: fn(),
    onSortChange: fn(),
    onItemClick: fn(),
  },
} satisfies Meta<typeof DocumentPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
