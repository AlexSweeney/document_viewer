import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField, textFieldSizes } from ".";

const meta = {
  title: "Atoms/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    appSurface: "controls",
  },
  argTypes: {
    size: {
      control: "select",
      options: textFieldSizes,
    },
  },
  args: {
    label: "Search documents",
    size: "medium",
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {textFieldSizes.map((size) => {
        const key = size;
        const label = `${size} TextField`;

        return <TextField key={key} label={label} size={size} />;
      })}
    </div>
  ),
};
