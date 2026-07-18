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

  it("allows tabbing between breadcrumb items", async () => {
    const user = userEvent.setup();
    const onTravelClick = vi.fn();
    render(
      <BreadCrumbs
        items={[
          { label: "Home", onClick: vi.fn() },
          { label: "Expenses", onClick: vi.fn() },
          { label: "Travel", onClick: onTravelClick },
        ]}
      />,
    );

    await user.tab();
    expect(
      screen.getByRole("button", { name: "Navigate to Home" }),
    ).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("button", { name: "Navigate to Expenses" }),
    ).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("button", { name: "Navigate to Travel" }),
    ).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(onTravelClick).toHaveBeenCalledOnce();
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
