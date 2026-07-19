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

    const homeLabel = screen.getByText("Home");
    const expensesLabel = screen.getByText("Expenses");
    const travelLabel = screen.getByText("Travel");

    expect(homeLabel).toBeInTheDocument();
    expect(expensesLabel).toBeInTheDocument();
    expect(travelLabel).toBeInTheDocument();
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

    const homeBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Home",
    });
    await user.click(homeBreadcrumb);

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

    const homeBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Home",
    });
    const expensesBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Expenses",
    });
    const travelBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Travel",
    });

    await user.tab();
    expect(homeBreadcrumb).toHaveFocus();

    await user.tab();
    expect(expensesBreadcrumb).toHaveFocus();

    await user.tab();
    expect(travelBreadcrumb).toHaveFocus();

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

    const breadCrumbs = container.firstChild;
    expect(breadCrumbs).toMatchSnapshot();
  });
});
