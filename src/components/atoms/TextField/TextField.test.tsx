import {
  cleanup,
  render,
  screen,
  userEvent,
  within,
} from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TextField, textFieldSizes } from ".";

afterEach(() => {
  cleanup();
});

describe("TextField", () => {
  it("renders the label", () => {
    render(<TextField label="Search documents" />);

    const searchInput = screen.getByLabelText("Search documents");
    expect(searchInput).toBeInTheDocument();
  });

  it("calls onChange with the input value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <TextField label="Search documents" onChange={onChange} />,
    );

    const searchInput = within(container).getByLabelText("Search documents");
    await user.type(searchInput, "pdf");

    expect(onChange).toHaveBeenLastCalledWith("pdf");
  });

  it.each(textFieldSizes)("matches snapshot for %s size", (size) => {
    const { container } = render(
      <TextField label="Search documents" size={size} />,
    );

    const textField = container.firstChild;
    expect(textField).toMatchSnapshot();
  });
});
