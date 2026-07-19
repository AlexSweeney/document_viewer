import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IconButton } from ".";

afterEach(() => {
  cleanup();
});

describe("IconButton", () => {
  it("renders with an accessible label", () => {
    render(<IconButton ariaLabel="Go back" icon="leftChevron" />);

    const goBackButton = screen.getByRole("button", { name: "Go back" });
    expect(goBackButton).toBeInTheDocument();
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

    const iconButton = container.firstChild;
    expect(iconButton).toMatchSnapshot();
  });
});
