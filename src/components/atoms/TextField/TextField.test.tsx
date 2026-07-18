import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TextField, textFieldSizes } from ".";

afterEach(() => {
  cleanup();
});

describe("TextField", () => {
  it("renders the label", () => {
    render(<TextField label="Search documents" />);

    expect(screen.getByLabelText("Search documents")).toBeInTheDocument();
  });

  it("calls onChange with the input value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <TextField label="Search documents" onChange={onChange} />,
    );

    await user.type(
      within(container).getByLabelText("Search documents"),
      "pdf",
    );

    expect(onChange).toHaveBeenLastCalledWith("pdf");
  });

  it.each(textFieldSizes)("matches snapshot for %s size", (size) => {
    const { container } = render(
      <TextField label="Search documents" size={size} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
