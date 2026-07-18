import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BreadCrumbs } from ".";

afterEach(() => {
  cleanup();
});

describe("BreadCrumbs", () => {
  it("renders BreadCrumb labels", () => {
    const items = [
      { label: "Home", onClick: vi.fn() },
      { label: "Expenses", onClick: vi.fn() },
      { label: "Travel", onClick: vi.fn() },
    ];

    render(<BreadCrumbs items={items} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("Travel")).toBeInTheDocument();
  });

  it("calls onClick when an item is clicked", async () => {
    const user = userEvent.setup();
    const onHomeClick = vi.fn();
    render(
      <BreadCrumbs
        items={[
          { label: "Home", onClick: onHomeClick },
          { label: "Expenses", onClick: vi.fn() },
          { label: "Travel", onClick: vi.fn() },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Navigate to Home" }));

    expect(onHomeClick).toHaveBeenCalledOnce();
  });

  it("matches snapshot", () => {
    const items = [
      { label: "Home", onClick: vi.fn() },
      { label: "Expenses", onClick: vi.fn() },
      { label: "Travel", onClick: vi.fn() },
    ];
    const { container } = render(<BreadCrumbs items={items} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
