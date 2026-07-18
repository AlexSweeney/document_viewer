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

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("Travel")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(
      <Header
        breadCrumbItems={breadCrumbItems}
        onClickBreadCrumb={vi.fn()}
        title="12 documents"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "12 documents" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    ).toBeInTheDocument();
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

    await user.click(
      screen.getByRole("button", { name: "Navigate to Expenses" }),
    );

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

    expect(container.firstChild).toMatchSnapshot();
  });
});
