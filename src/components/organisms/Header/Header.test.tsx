import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Header } from ".";

const breadCrumbItems = [
  { label: "Home" },
  { label: "Expenses" },
  { label: "Travel" },
];

afterEach(() => {
  cleanup();
});

describe("Header", () => {
  it("renders breadcrumb labels", () => {
    render(
      <Header
        breadCrumbItems={breadCrumbItems}
        onClickBreadCrumb={vi.fn()}
        title="12 documents"
      />,
    );

    const homeLabel = screen.getByText("Home");
    const expensesLabel = screen.getByText("Expenses");
    const travelLabel = screen.getByText("Travel");

    expect(homeLabel).toBeInTheDocument();
    expect(expensesLabel).toBeInTheDocument();
    expect(travelLabel).toBeInTheDocument();
  });

  it("renders title", () => {
    render(
      <Header
        breadCrumbItems={breadCrumbItems}
        onClickBreadCrumb={vi.fn()}
        title="12 documents"
      />,
    );

    const title = screen.getByRole("heading", {
      level: 1,
      name: "12 documents",
    });
    const themeModeToggle = screen.getByRole("button", {
      name: "Switch to dark mode",
    });

    expect(title).toBeInTheDocument();
    expect(themeModeToggle).toBeInTheDocument();
  });

  it("calls onClickBreadCrumb with the item index and item when a breadcrumb is clicked", async () => {
    const user = userEvent.setup();
    const onClickBreadCrumb = vi.fn();
    render(
      <Header
        breadCrumbItems={breadCrumbItems}
        onClickBreadCrumb={onClickBreadCrumb}
        title="12 documents"
      />,
    );

    const expensesBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Expenses",
    });
    await user.click(expensesBreadcrumb);

    expect(onClickBreadCrumb).toHaveBeenCalledOnce();
    expect(onClickBreadCrumb).toHaveBeenCalledWith(1, { label: "Expenses" });
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Header
        breadCrumbItems={breadCrumbItems}
        onClickBreadCrumb={vi.fn()}
        title="12 documents"
      />,
    );

    const header = container.firstChild;
    expect(header).toMatchSnapshot();
  });
});
