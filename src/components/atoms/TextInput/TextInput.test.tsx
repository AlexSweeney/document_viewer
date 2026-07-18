import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TextInput, textInputSizes } from ".";

afterEach(() => {
  cleanup();
});

describe("TextInput", () => {
  it("renders the label", () => {
    render(<TextInput label="Search documents" />);

    expect(screen.getByLabelText("Search documents")).toBeInTheDocument();
  });

  it("calls onChange with the input value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <TextInput label="Search documents" onChange={onChange} />,
    );

    await user.type(
      within(container).getByLabelText("Search documents"),
      "pdf",
    );

    expect(onChange).toHaveBeenLastCalledWith("pdf");
  });

  it.each(textInputSizes)("matches snapshot for %s size", (size) => {
    const { container } = render(
      <TextInput label="Search documents" size={size} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
