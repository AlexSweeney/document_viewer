import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IconButton } from ".";

afterEach(() => {
  cleanup();
});

describe("IconButton", () => {
  it("renders with an accessible label", () => {
    render(<IconButton ariaLabel="Go back" icon="leftChevron" />);

    expect(screen.getByRole("button", { name: "Go back" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton ariaLabel="Go back" icon="leftChevron" onClick={onClick} />,
    );

    const goBackButton = screen.getByRole("button", { name: "Go back" });
    await user.click(goBackButton);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <IconButton ariaLabel="Go back" icon="leftChevron" />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
