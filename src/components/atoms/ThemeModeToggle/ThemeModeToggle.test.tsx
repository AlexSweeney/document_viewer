import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeModeToggle } from ".";

afterEach(() => {
  cleanup();
});

describe("ThemeModeToggle", () => {
  it("renders a switch to dark mode button in light mode", () => {
    render(<ThemeModeToggle />);

    const darkModeButton = screen.getByRole("button", {
      name: "Switch to dark mode",
    });
    expect(darkModeButton).toBeInTheDocument();
  });

  it("toggles to dark mode when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeModeToggle />);

    const darkModeButton = screen.getByRole("button", {
      name: "Switch to dark mode",
    });
    await user.click(darkModeButton);

    const lightModeButton = screen.getByRole("button", {
      name: "Switch to light mode",
    });
    expect(lightModeButton).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<ThemeModeToggle />);

    const themeModeToggle = container.firstChild;
    expect(themeModeToggle).toMatchSnapshot();
  });
});
