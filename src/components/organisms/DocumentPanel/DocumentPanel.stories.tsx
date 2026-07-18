import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { DocumentItem } from "../../molecules/DocumentItem";
import { DocumentPanel } from ".";

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date created" },
  { value: "type", label: "File type" },
];

const sampleItems = [
  { name: "Employee Handbook", type: "pdf", added: "2017-01-06" },
  { name: "Q4 Report", type: "xlsx", added: "2018-03-12" },
  { name: "Documents", type: "folder", files: [] },
] as const;

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
    filterValue: "",
    sortOptions,
    sortValue: "name",
    onBackClick: fn(),
    onForwardClick: fn(),
    onSortDirectionClick: fn(),
    onFilterChange: fn(),
    onSortChange: fn(),
  },
  render: (args) => (
    <DocumentPanel {...args}>
      {sampleItems.map((item, index) => (
        <DocumentItem key={`${item.name}-${index}`} item={item} />
      ))}
    </DocumentPanel>
  ),
} satisfies Meta<typeof DocumentPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  render: (args) => <DocumentPanel {...args} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
