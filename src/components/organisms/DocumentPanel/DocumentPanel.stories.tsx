import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type { DocumentItem as DocumentItemData } from "../../../types/document";
import { DocumentItem } from "../..";
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
  { name: "Cost centres", type: "csv", added: "2016-03-22" },
  { name: "Public Holiday policy", type: "pdf", added: "2016-12-06" },
  { name: "Expenses", type: "folder", files: [] },
  { name: "Expenses claim form", type: "doc", added: "2017-05-02" },
  { name: "HR", type: "folder", files: [] },
] satisfies DocumentItemData[];

const meta = {
  title: "Organisms/DocumentPanel",
  component: DocumentPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    appSurface: "panelWrapper",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          width: "100%",
        }}
      >
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
      {sampleItems.map((item, index) => {
        const key = `${item.name}-${index}`;

        return <DocumentItem key={key} item={item} />;
      })}
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

export const Error: Story = {
  args: {
    isError: true,
    errorMessage: "Failed to load documents. Please refresh the page.",
  },
};
