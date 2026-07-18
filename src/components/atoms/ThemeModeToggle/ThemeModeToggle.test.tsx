import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeModeToggle } from ".";

afterEach(() => {
  cleanup();
});

describe("ThemeModeToggle", () => {
  it("renders a switch to dark mode button in light mode", () => {
    render(<ThemeModeToggle />);

    expect(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    ).toBeInTheDocument();
  });

  it("toggles to dark mode when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeModeToggle />);

    await user.click(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    );

    expect(
      screen.getByRole("button", { name: "Switch to light mode" }),
    ).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<ThemeModeToggle />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
