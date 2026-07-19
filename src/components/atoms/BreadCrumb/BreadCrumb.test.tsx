import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BreadCrumb } from ".";

afterEach(() => {
  cleanup();
});

describe("BreadCrumb", () => {
  it("renders the label", () => {
    render(<BreadCrumb label="Expenses" onClick={vi.fn()} />);

    const label = screen.getByText("Expenses");
    expect(label).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<BreadCrumb label="Expenses" onClick={onClick} />);

    const breadcrumbButton = screen.getByRole("button", {
      name: "Navigate to Expenses",
    });
    await user.click(breadcrumbButton);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is reachable via Tab and activates with Enter", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<BreadCrumb label="Expenses" onClick={onClick} />);

    const breadcrumbButton = screen.getByRole("button", {
      name: "Navigate to Expenses",
    });

    await user.tab();

    expect(breadcrumbButton).toHaveFocus();
    expect(breadcrumbButton).toHaveAttribute("tabindex", "0");

    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <BreadCrumb label="Expenses" onClick={vi.fn()} />,
    );

    const breadCrumb = container.firstChild;
    expect(breadCrumb).toMatchSnapshot();
  });
});
