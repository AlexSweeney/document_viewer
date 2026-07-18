import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SelectField, selectFieldSizes } from ".";

const options = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date" },
  { value: "size", label: "Size" },
];

afterEach(() => {
  cleanup();
});

describe("SelectField", () => {
  it("renders the label", () => {
    render(<SelectField label="Sort by" options={options} />);

    expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
  });

  it("calls onChange with the option value when an option is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SelectField label="Sort by" options={options} onChange={onChange} />,
    );

    await user.click(screen.getByRole("combobox", { name: "Sort by" }));
    await user.click(screen.getByRole("option", { name: "Date" }));

    expect(onChange).toHaveBeenCalledWith("date");
  });

  it.each(selectFieldSizes)("matches snapshot for %s size", (size) => {
    const { container } = render(
      <SelectField label="Sort by" options={options} size={size} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
