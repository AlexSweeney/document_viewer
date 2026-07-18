import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, type IconName } from ".";

const names: IconName[] = [
  "leftChevron",
  "rightChevron",
  "upArrow",
  "downArrow",
  "pdf",
  "doc",
  "csv",
  "mov",
  "xlsx",
  "folder",
];

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: names,
    },
  },
  args: {
    name: "pdf",
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllNames: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "1rem",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {names.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Icon name={name} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
};
