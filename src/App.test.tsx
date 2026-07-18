import { cleanup, render, screen } from "./test/testUtils";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the header", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Document viewer" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("Travel")).toBeInTheDocument();
  });

  it("renders the document panel", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "Go back" })).toBeInTheDocument();
    expect(screen.getByLabelText("filter by name")).toBeInTheDocument();
    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    expect(screen.getByText("Q4 Report")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
