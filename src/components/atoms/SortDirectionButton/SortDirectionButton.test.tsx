import {
  cleanup,
  render,
  screen,
  userEvent,
  within,
} from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SortDirectionButton, sortDirections } from ".";

afterEach(() => {
  cleanup();
});

describe("SortDirectionButton", () => {
  it("renders the up arrow by default", () => {
    const { container } = render(
      <SortDirectionButton ariaLabel="Sort by name" />,
    );

    expect(
      screen.getByRole("button", { name: "Sort by name" }),
    ).toBeInTheDocument();
    expect(
      within(container).getByTestId("ArrowUpwardIcon"),
    ).toBeInTheDocument();
  });

  it.each(sortDirections)(
    "renders the %s direction icon from defaultDirection",
    (defaultDirection) => {
      const { container } = render(
        <SortDirectionButton
          defaultDirection={defaultDirection}
          ariaLabel="Sort by name"
        />,
      );

      const iconName =
        defaultDirection === "asc" ? "ArrowUpwardIcon" : "ArrowDownwardIcon";
      expect(within(container).getByTestId(iconName)).toBeInTheDocument();
    },
  );

  it("toggles between up and down arrows when clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SortDirectionButton ariaLabel="Sort by name" />,
    );
    const button = screen.getByRole("button", { name: "Sort by name" });

    expect(
      within(container).getByTestId("ArrowUpwardIcon"),
    ).toBeInTheDocument();

    await user.click(button);
    expect(
      within(container).getByTestId("ArrowDownwardIcon"),
    ).toBeInTheDocument();

    await user.click(button);
    expect(
      within(container).getByTestId("ArrowUpwardIcon"),
    ).toBeInTheDocument();
  });

  it("calls onClick with the new direction when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SortDirectionButton ariaLabel="Sort by name" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Sort by name" }));
    await user.click(screen.getByRole("button", { name: "Sort by name" }));

    expect(onClick).toHaveBeenNthCalledWith(1, "desc");
    expect(onClick).toHaveBeenNthCalledWith(2, "asc");
  });

  it.each(sortDirections)(
    "matches snapshot for %s defaultDirection",
    (defaultDirection) => {
      const { container } = render(
        <SortDirectionButton
          defaultDirection={defaultDirection}
          ariaLabel="Sort by name"
        />,
      );

      expect(container.firstChild).toMatchSnapshot();
    },
  );
});
