import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type {
  DocumentItemType,
  DocumentItem as DocumentItemData,
} from "../../../types/document";
import { DocumentItem } from ".";

const itemTypes: DocumentItemType[] = [
  "folder",
  "pdf",
  "doc",
  "csv",
  "mov",
  "xlsx",
];

const createSampleItem = (type: DocumentItemType): DocumentItemData =>
  type === "folder"
    ? { name: `Sample ${type}`, type, files: [] }
    : { name: `Sample ${type}`, type, added: "2017-01-06" };

const meta = {
  title: "Molecules/DocumentItem",
  component: DocumentItem,
  tags: ["autodocs"],
  args: {
    item: {
      name: "Employee Handbook",
      type: "pdf",
      added: "2017-01-06",
    },
    onClick: fn(),
  },
} satisfies Meta<typeof DocumentItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllItemTypes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      {itemTypes.map((type) => (
        <DocumentItem key={type} item={createSampleItem(type)} onClick={fn()} />
      ))}
    </div>
  ),
};
