import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "./Typography";
import { typographyVariants } from "./typographyVariants";

const meta = {
  title: "Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: typographyVariants,
    },
  },
  args: {
    variant: "body1",
    children: "The quick brown fox jumps over the lazy dog.",
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {typographyVariants.map((variant) => (
        <Typography key={variant} variant={variant}>
          {variant}: The quick brown fox jumps over the lazy dog.
        </Typography>
      ))}
    </div>
  ),
};
