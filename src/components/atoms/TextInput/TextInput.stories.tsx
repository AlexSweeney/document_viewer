import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInput, textInputSizes } from ".";

const meta = {
  title: "Atoms/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: textInputSizes,
    },
  },
  args: {
    label: "Search documents",
    size: "medium",
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {textInputSizes.map((size) => (
        <TextInput key={size} label={`${size} TextInput`} size={size} />
      ))}
    </div>
  ),
};
