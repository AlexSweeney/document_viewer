import { waitFor } from "@testing-library/react";
import { cleanup, render, screen, userEvent } from "../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as documentsApi from "../api/documents";
import App from "./App";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const getDocumentNames = () =>
  screen
    .getAllByRole("button")
    .map((button) => button.getAttribute("aria-label"))
    .filter((label): label is string => label?.startsWith("Open ") ?? false)
    .map((label) => label.replace("Open ", ""));

const waitForDocumentsToLoad = () =>
  waitFor(
    () => {
      const employeeHandbook = screen.getByText("Employee Handbook");
      expect(employeeHandbook).toBeInTheDocument();
    },
    { timeout: 3000 },
  );

const waitForExpensesFolder = () =>
  waitFor(
    () => {
      const expensesFolder = screen.getByRole("button", {
        name: "Open Expenses",
      });
      expect(expensesFolder).toBeInTheDocument();
    },
    { timeout: 3000 },
  );

describe("App", () => {
  it("renders the header", async () => {
    render(<App />);

    const title = screen.getByRole("heading", { name: "Document viewer" });
    const homeBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Home",
    });
    const themeModeToggle = screen.getByRole("button", {
      name: "Switch to dark mode",
    });
    const expensesBreadcrumb = screen.queryByRole("button", {
      name: "Navigate to Expenses",
    });

    expect(title).toBeInTheDocument();
    expect(homeBreadcrumb).toBeInTheDocument();
    expect(themeModeToggle).toBeInTheDocument();
    expect(expensesBreadcrumb).not.toBeInTheDocument();
  });

  it("renders the document panel", async () => {
    render(<App />);

    await waitForDocumentsToLoad();

    const backButton = screen.getByRole("button", { name: "Go back" });
    const forwardButton = screen.getByRole("button", { name: "Go forward" });
    const filterInput = screen.getByLabelText("filter by name");
    const publicHolidayPolicy = screen.getByText("Public Holiday policy");
    const costCentres = screen.getByText("Cost centres");
    const misc = screen.getByText("Misc");
    const hr = screen.getByText("HR");

    expect(backButton).toBeInTheDocument();
    expect(backButton).toBeDisabled();
    expect(forwardButton).toBeDisabled();
    expect(filterInput).toBeInTheDocument();
    expect(publicHolidayPolicy).toBeInTheDocument();
    expect(costCentres).toBeInTheDocument();
    expect(misc).toBeInTheDocument();
    expect(hr).toBeInTheDocument();
  });

  it("shows an error state when documents fail to load", async () => {
    vi.spyOn(documentsApi, "fetchDocuments").mockRejectedValueOnce(
      new Error("Failed to load documents"),
    );

    render(<App />);

    await waitFor(() => {
      const errorMessage = screen.getByRole("alert");
      expect(errorMessage).toHaveTextContent(
        "Failed to load documents. Please refresh the page.",
      );
    });

    const employeeHandbook = screen.queryByText("Employee Handbook");
    expect(employeeHandbook).not.toBeInTheDocument();
  });

  it("filters documents by name", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForDocumentsToLoad();

    const filterInput = screen.getByLabelText("filter by name");
    await user.type(filterInput, "handbook");

    const employeeHandbook = screen.getByText("Employee Handbook");
    const publicHolidayPolicy = screen.queryByText("Public Holiday policy");
    const costCentres = screen.queryByText("Cost centres");

    expect(employeeHandbook).toBeInTheDocument();
    expect(publicHolidayPolicy).not.toBeInTheDocument();
    expect(costCentres).not.toBeInTheDocument();
  });

  it("ignores whitespace when filtering by name", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForDocumentsToLoad();

    const filterInput = screen.getByLabelText("filter by name");
    await user.type(filterInput, "hand  book");

    const employeeHandbook = screen.getByText("Employee Handbook");
    const publicHolidayPolicy = screen.queryByText("Public Holiday policy");

    expect(employeeHandbook).toBeInTheDocument();
    expect(publicHolidayPolicy).not.toBeInTheDocument();
  });

  it("sorts documents by name ascending by default", async () => {
    render(<App />);

    await waitFor(
      () => {
        const firstDocumentName = getDocumentNames()[0];
        expect(firstDocumentName).toBe("Cost centres");
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

    await waitForDocumentsToLoad();

    const sortSelect = screen.getByRole("combobox", { name: "sort by" });

    await user.click(sortSelect);

    const dateCreatedOption = screen.getByRole("option", {
      name: "Date created",
    });
    await user.click(dateCreatedOption);

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

    await waitForExpensesFolder();

    const expensesFolder = screen.getByRole("button", {
      name: "Open Expenses",
    });
    await user.click(expensesFolder);

    const expensesBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Expenses",
    });
    const expensesClaimForm = screen.getByText("Expenses claim form");
    const fuelAllowances = screen.getByText("Fuel allowances");
    const travel = screen.getByText("Travel");
    const employeeHandbook = screen.queryByText("Employee Handbook");

    expect(expensesBreadcrumb).toBeInTheDocument();
    expect(expensesClaimForm).toBeInTheDocument();
    expect(fuelAllowances).toBeInTheDocument();
    expect(travel).toBeInTheDocument();
    expect(employeeHandbook).not.toBeInTheDocument();
  });

  it("opens nested folders when clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForExpensesFolder();

    const expensesFolder = screen.getByRole("button", {
      name: "Open Expenses",
    });

    await user.click(expensesFolder);

    const travelFolder = screen.getByRole("button", { name: "Open Travel" });
    await user.click(travelFolder);

    const travelBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Travel",
    });
    const internationalTravelPolicy = screen.getByText(
      "International travel policy",
    );
    const mileageLogTemplate = screen.getByText("Mileage log template");
    const year2024 = screen.getByText("2024");
    const expensesClaimForm = screen.queryByText("Expenses claim form");

    expect(travelBreadcrumb).toBeInTheDocument();
    expect(internationalTravelPolicy).toBeInTheDocument();
    expect(mileageLogTemplate).toBeInTheDocument();
    expect(year2024).toBeInTheDocument();
    expect(expensesClaimForm).not.toBeInTheDocument();
  });

  it("navigates back to the parent folder", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForExpensesFolder();

    const expensesFolder = screen.getByRole("button", {
      name: "Open Expenses",
    });
    await user.click(expensesFolder);

    const backButton = screen.getByRole("button", { name: "Go back" });
    expect(backButton).toBeEnabled();

    await user.click(backButton);

    const employeeHandbook = screen.getByText("Employee Handbook");
    const expensesClaimForm = screen.queryByText("Expenses claim form");
    const forwardButton = screen.getByRole("button", { name: "Go forward" });

    expect(employeeHandbook).toBeInTheDocument();
    expect(expensesClaimForm).not.toBeInTheDocument();
    expect(backButton).toBeDisabled();
    expect(forwardButton).toBeEnabled();
  });

  it("navigates forward to a previously visited folder", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForExpensesFolder();

    const expensesFolder = screen.getByRole("button", {
      name: "Open Expenses",
    });
    const backButton = screen.getByRole("button", { name: "Go back" });
    const forwardButton = screen.getByRole("button", { name: "Go forward" });

    await user.click(expensesFolder);
    await user.click(backButton);
    await user.click(forwardButton);

    const expensesClaimForm = screen.getByText("Expenses claim form");
    const employeeHandbook = screen.queryByText("Employee Handbook");

    expect(expensesClaimForm).toBeInTheDocument();
    expect(employeeHandbook).not.toBeInTheDocument();
    expect(backButton).toBeEnabled();
    expect(forwardButton).toBeDisabled();
  });

  it("clears forward history when navigating to a new folder", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForExpensesFolder();

    const expensesFolder = screen.getByRole("button", {
      name: "Open Expenses",
    });

    await user.click(expensesFolder);

    const backButton = screen.getByRole("button", { name: "Go back" });
    await user.click(backButton);

    const hrFolder = screen.getByRole("button", { name: "Open HR" });
    await user.click(hrFolder);

    const policies = screen.getByText("Policies");
    const onboarding = screen.getByText("Onboarding");
    const forwardButton = screen.getByRole("button", { name: "Go forward" });

    expect(policies).toBeInTheDocument();
    expect(onboarding).toBeInTheDocument();
    expect(forwardButton).toBeDisabled();
  });

  it("navigates via keyboard tab and enter on BreadCrumbs", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForDocumentsToLoad();

    const homeBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Home",
    });

    await user.tab();
    expect(homeBreadcrumb).toHaveFocus();

    const expensesFolder = screen.getByRole("button", {
      name: "Open Expenses",
    });
    await user.click(expensesFolder);

    await waitFor(() => {
      const expensesBreadcrumb = screen.getByRole("button", {
        name: "Navigate to Expenses",
      });
      expect(expensesBreadcrumb).toBeInTheDocument();
    });

    await user.tab();
    expect(homeBreadcrumb).toHaveFocus();

    await user.keyboard("{Enter}");

    const employeeHandbook = screen.getByText("Employee Handbook");
    const expensesBreadcrumb = screen.queryByRole("button", {
      name: "Navigate to Expenses",
    });

    expect(employeeHandbook).toBeInTheDocument();
    expect(expensesBreadcrumb).not.toBeInTheDocument();
  });

  it("navigates via breadcrumb click", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForExpensesFolder();

    const expensesFolder = screen.getByRole("button", {
      name: "Open Expenses",
    });
    const homeBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Home",
    });

    await user.click(expensesFolder);

    const travelFolder = screen.getByRole("button", { name: "Open Travel" });
    await user.click(travelFolder);
    await user.click(homeBreadcrumb);

    const employeeHandbook = screen.getByText("Employee Handbook");
    const expensesBreadcrumb = screen.queryByRole("button", {
      name: "Navigate to Expenses",
    });
    const backButton = screen.getByRole("button", { name: "Go back" });
    const forwardButton = screen.getByRole("button", { name: "Go forward" });

    expect(employeeHandbook).toBeInTheDocument();
    expect(expensesBreadcrumb).not.toBeInTheDocument();
    expect(backButton).toBeEnabled();
    expect(forwardButton).toBeDisabled();
  });

  it("navigates to a parent folder via breadcrumb click", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForExpensesFolder();

    const expensesFolder = screen.getByRole("button", {
      name: "Open Expenses",
    });

    await user.click(expensesFolder);

    const travelFolder = screen.getByRole("button", { name: "Open Travel" });
    const expensesBreadcrumb = screen.getByRole("button", {
      name: "Navigate to Expenses",
    });

    await user.click(travelFolder);
    await user.click(expensesBreadcrumb);

    const expensesClaimForm = screen.getByText("Expenses claim form");
    const internationalTravelPolicy = screen.queryByText(
      "International travel policy",
    );
    const travelBreadcrumb = screen.queryByRole("button", {
      name: "Navigate to Travel",
    });

    expect(expensesClaimForm).toBeInTheDocument();
    expect(internationalTravelPolicy).not.toBeInTheDocument();
    expect(travelBreadcrumb).not.toBeInTheDocument();
  });

  it("reverses sort direction when toggled", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        const firstDocumentName = getDocumentNames()[0];
        expect(firstDocumentName).toBe("Cost centres");
      },
      { timeout: 3000 },
    );

    const sortDirectionButton = screen.getByRole("button", {
      name: "Toggle sort direction",
    });
    await user.click(sortDirectionButton);

    const firstDocumentName = getDocumentNames()[0];
    const lastDocumentName = getDocumentNames().at(-1);

    expect(firstDocumentName).toBe("Public Holiday policy");
    expect(lastDocumentName).toBe("Cost centres");
  });

  it("matches snapshot", async () => {
    const { container } = render(<App />);

    await waitForDocumentsToLoad();

    const app = container.firstChild;
    expect(app).toMatchSnapshot();
  });
});
