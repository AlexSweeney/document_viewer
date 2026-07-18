import { waitFor } from "@testing-library/react";
import { cleanup, render, screen, userEvent } from "./test/testUtils";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(() => {
  cleanup();
});

const getDocumentNames = () =>
  screen
    .getAllByRole("button")
    .map((button) => button.getAttribute("aria-label"))
    .filter((label): label is string => label?.startsWith("Open ") ?? false)
    .map((label) => label.replace("Open ", ""));

describe("App", () => {
  it("renders the header", async () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Document viewer" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Navigate to Home" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Navigate to Expenses" }),
    ).not.toBeInTheDocument();
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
    expect(screen.getByRole("button", { name: "Go back" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go forward" })).toBeDisabled();
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

  it("sorts documents by name ascending by default", async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(getDocumentNames()[0]).toBe("Cost centres");
      },
      { timeout: 3000 },
    );

    expect(getDocumentNames()).toEqual([
      "Cost centres",
      "Employee Handbook",
      "Expenses",
      "HR",
      "Misc",
      "Public Holiday policy",
    ]);
  });

  it("sorts documents by date created", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.click(screen.getByRole("combobox", { name: "sort by" }));
    await user.click(screen.getByRole("option", { name: "Date created" }));

    expect(getDocumentNames()).toEqual([
      "Cost centres",
      "Public Holiday policy",
      "Employee Handbook",
      "Expenses",
      "Misc",
      "HR",
    ]);
  });

  it("opens a folder when clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: "Open Expenses" }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.click(screen.getByRole("button", { name: "Open Expenses" }));

    expect(screen.getByText("Expenses claim form")).toBeInTheDocument();
    expect(screen.getByText("Fuel allowances")).toBeInTheDocument();
    expect(screen.getByText("Travel")).toBeInTheDocument();
    expect(screen.queryByText("Employee Handbook")).not.toBeInTheDocument();
  });

  it("opens nested folders when clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: "Open Expenses" }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.click(screen.getByRole("button", { name: "Open Expenses" }));
    await user.click(screen.getByRole("button", { name: "Open Travel" }));

    expect(screen.getByText("International travel policy")).toBeInTheDocument();
    expect(screen.getByText("Mileage log template")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.queryByText("Expenses claim form")).not.toBeInTheDocument();
  });

  it("navigates back to the parent folder", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: "Open Expenses" }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.click(screen.getByRole("button", { name: "Open Expenses" }));

    expect(screen.getByRole("button", { name: "Go back" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Go back" }));

    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    expect(screen.queryByText("Expenses claim form")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go back" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go forward" })).toBeEnabled();
  });

  it("navigates forward to a previously visited folder", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: "Open Expenses" }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.click(screen.getByRole("button", { name: "Open Expenses" }));
    await user.click(screen.getByRole("button", { name: "Go back" }));
    await user.click(screen.getByRole("button", { name: "Go forward" }));

    expect(screen.getByText("Expenses claim form")).toBeInTheDocument();
    expect(screen.queryByText("Employee Handbook")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go back" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Go forward" })).toBeDisabled();
  });

  it("clears forward history when navigating to a new folder", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: "Open Expenses" }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.click(screen.getByRole("button", { name: "Open Expenses" }));
    await user.click(screen.getByRole("button", { name: "Go back" }));
    await user.click(screen.getByRole("button", { name: "Open HR" }));

    expect(screen.getByText("Policies")).toBeInTheDocument();
    expect(screen.getByText("Onboarding")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go forward" })).toBeDisabled();
  });

  it("reverses sort direction when toggled", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(getDocumentNames()[0]).toBe("Cost centres");
      },
      { timeout: 3000 },
    );

    await user.click(
      screen.getByRole("button", { name: "Toggle sort direction" }),
    );

    expect(getDocumentNames()[0]).toBe("Public Holiday policy");
    expect(getDocumentNames().at(-1)).toBe("Cost centres");
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
