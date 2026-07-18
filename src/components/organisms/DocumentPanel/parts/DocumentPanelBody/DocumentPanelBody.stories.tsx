import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DocumentItem as DocumentItemData } from "../../../../../types/document";
import { DocumentItem } from "../../../../molecules/DocumentItem";
import { DocumentPanelBody } from ".";

const sampleItems = [
  { name: "Employee Handbook", type: "pdf", added: "2017-01-06" },
  { name: "Q4 Report", type: "xlsx", added: "2018-03-12" },
  { name: "Documents", type: "folder", files: [] },
  { name: "Cost centres", type: "csv", added: "2016-03-22" },
  { name: "Public Holiday policy", type: "pdf", added: "2016-12-06" },
  { name: "Expenses", type: "folder", files: [] },
] satisfies DocumentItemData[];

const meta = {
  title: "Organisms/DocumentPanel/Body",
  component: DocumentPanelBody,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "24rem", width: "100%" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <DocumentPanelBody {...args}>
      {sampleItems.map((item, index) => (
        <DocumentItem key={`${item.name}-${index}`} item={item} />
      ))}
    </DocumentPanelBody>
  ),
} satisfies Meta<typeof DocumentPanelBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  render: (args) => <DocumentPanelBody {...args} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
