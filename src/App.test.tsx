import { waitFor } from "@testing-library/react";
import { cleanup, render, screen, userEvent } from "./test/testUtils";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the header", async () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Document viewer" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("Travel")).toBeInTheDocument();
  });

  it("renders the document panel", async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(screen.getByRole("button", { name: "Go back" })).toBeInTheDocument();
    expect(screen.getByLabelText("filter by name")).toBeInTheDocument();
    expect(screen.getByText("Public Holiday policy")).toBeInTheDocument();
    expect(screen.getByText("Cost centres")).toBeInTheDocument();
    expect(screen.getByText("Misc")).toBeInTheDocument();
    expect(screen.getByText("HR")).toBeInTheDocument();
  });

  it("filters documents by name", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.type(screen.getByLabelText("filter by name"), "handbook");

    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    expect(screen.queryByText("Public Holiday policy")).not.toBeInTheDocument();
    expect(screen.queryByText("Cost centres")).not.toBeInTheDocument();
  });

  it("ignores whitespace when filtering by name", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.type(screen.getByLabelText("filter by name"), "hand  book");

    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    expect(screen.queryByText("Public Holiday policy")).not.toBeInTheDocument();
  });

  it("matches snapshot", async () => {
    const { container } = render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
