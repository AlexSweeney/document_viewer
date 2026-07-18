import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BreadCrumb } from ".";

afterEach(() => {
  cleanup();
});

describe("BreadCrumb", () => {
  it("renders the label", () => {
    render(<BreadCrumb label="Expenses" onClick={vi.fn()} />);

    expect(screen.getByText("Expenses")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<BreadCrumb label="Expenses" onClick={onClick} />);

    await user.click(
      screen.getByRole("button", { name: "Navigate to Expenses" }),
    );

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <BreadCrumb label="Expenses" onClick={vi.fn()} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
