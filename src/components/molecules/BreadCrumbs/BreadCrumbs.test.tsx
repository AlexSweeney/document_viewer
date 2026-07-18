import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BreadCrumbs } from ".";

const items: { label: string }[] = [
  { label: "Home" },
  { label: "Expenses" },
  { label: "Travel" },
];

describe("BreadCrumbs", () => {
  it("renders BreadCrumb labels", () => {
    render(<BreadCrumbs items={items} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("Travel")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<BreadCrumbs items={items} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
