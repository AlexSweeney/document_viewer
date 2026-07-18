import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DocumentItemType } from "../../../types/document";
import { DocumentItem } from ".";

const itemTypes: DocumentItemType[] = [
  "folder",
  "pdf",
  "doc",
  "csv",
  "mov",
  "xlsx",
];

const meta = {
  title: "Molecules/DocumentItem",
  component: DocumentItem,
  tags: ["autodocs"],
  args: {
    name: "Employee Handbook",
    type: "pdf",
    dateCreated: "2017-01-06",
  },
} satisfies Meta<typeof DocumentItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllItemTypes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      {itemTypes.map((type) => (
        <DocumentItem
          key={type}
          name={`Sample ${type}`}
          type={type}
          dateCreated="2017-01-06"
        />
      ))}
    </div>
  ),
};
