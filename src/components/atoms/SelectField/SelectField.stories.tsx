import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectField, selectFieldSizes } from ".";

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date" },
  { value: "size", label: "Size" },
];

const meta = {
  title: "Atoms/SelectField",
  component: SelectField,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: selectFieldSizes,
    },
  },
  args: {
    label: "Sort by",
    options: sortOptions,
    size: "medium",
  },
} satisfies Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {selectFieldSizes.map((size) => {
        const key = size;
        const label = `${size} SelectField`;

        return (
          <SelectField
            key={key}
            label={label}
            options={sortOptions}
            size={size}
          />
        );
      })}
    </div>
  ),
};
