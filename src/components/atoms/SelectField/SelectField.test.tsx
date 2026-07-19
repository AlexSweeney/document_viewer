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

    const sortSelect = screen.getByLabelText("Sort by");
    expect(sortSelect).toBeInTheDocument();
  });

  it("calls onChange with the option value when an option is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SelectField label="Sort by" options={options} onChange={onChange} />,
    );

    const sortSelect = screen.getByRole("combobox", { name: "Sort by" });

    await user.click(sortSelect);

    const dateOption = screen.getByRole("option", { name: "Date" });
    await user.click(dateOption);

    expect(onChange.mock.lastCall?.[0].target.value).toBe("date");
  });

  it.each(selectFieldSizes)("matches snapshot for %s size", (size) => {
    const { container } = render(
      <SelectField label="Sort by" options={options} size={size} />,
    );

    const selectField = container.firstChild;
    expect(selectField).toMatchSnapshot();
  });
});
