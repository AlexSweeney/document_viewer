import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BreadCrumb } from "./BreadCrumb";

describe("BreadCrumb", () => {
  it("renders the label", () => {
    render(<BreadCrumb label="Expenses" />);

    expect(screen.getByText("Expenses")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<BreadCrumb label="Expenses" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
