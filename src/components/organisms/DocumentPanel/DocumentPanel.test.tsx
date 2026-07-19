import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DocumentItem } from "../../molecules/DocumentItem";
import { DocumentPanel } from ".";

const items = [
  {
    name: "Employee Handbook",
    type: "pdf" as const,
    added: "2017-01-06",
  },
  { name: "Q4 Report", type: "xlsx" as const, added: "2018-03-12" },
  { name: "Documents", type: "folder" as const, files: [] },
];

const panelChildren = items.map((item, index) => {
  const key = `${item.name}-${index}`;

  return <DocumentItem key={key} item={item} />;
});

afterEach(() => {
  cleanup();
});

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date created" },
  { value: "type", label: "File type" },
];

describe("DocumentPanel", () => {
  it("renders toolbar controls", () => {
    render(
      <DocumentPanel sortOptions={sortOptions}>{panelChildren}</DocumentPanel>,
    );

    const backButton = screen.getByRole("button", { name: "Go back" });
    const forwardButton = screen.getByRole("button", { name: "Go forward" });
    const sortDirectionButton = screen.getByRole("button", {
      name: "Toggle sort direction",
    });
    const filterInput = screen.getByLabelText("filter by name");
    const sortSelect = screen.getByRole("combobox", { name: "sort by" });

    expect(backButton).toBeInTheDocument();
    expect(forwardButton).toBeInTheDocument();
    expect(sortDirectionButton).toBeInTheDocument();
    expect(filterInput).toBeInTheDocument();
    expect(sortSelect).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <DocumentPanel sortOptions={sortOptions}>{panelChildren}</DocumentPanel>,
    );

    const employeeHandbook = screen.getByText("Employee Handbook");
    const q4Report = screen.getByText("Q4 Report");
    const documents = screen.getByText("Documents");

    expect(employeeHandbook).toBeInTheDocument();
    expect(q4Report).toBeInTheDocument();
    expect(documents).toBeInTheDocument();
  });

  it("disables the back button when isBackDisabled is true", () => {
    render(
      <DocumentPanel sortOptions={sortOptions} isBackDisabled>
        {panelChildren}
      </DocumentPanel>,
    );

    const backButton = screen.getByRole("button", { name: "Go back" });
    expect(backButton).toBeDisabled();
  });

  it("disables the forward button when isForwardDisabled is true", () => {
    render(
      <DocumentPanel sortOptions={sortOptions} isForwardDisabled>
        {panelChildren}
      </DocumentPanel>,
    );

    const forwardButton = screen.getByRole("button", { name: "Go forward" });
    expect(forwardButton).toBeDisabled();
  });

  it("calls toolbar handlers when clicked", async () => {
    const user = userEvent.setup();
    const onBackClick = vi.fn();
    const onForwardClick = vi.fn();
    const onSortDirectionClick = vi.fn();
    render(
      <DocumentPanel
        sortOptions={sortOptions}
        onBackClick={onBackClick}
        onForwardClick={onForwardClick}
        onSortDirectionClick={onSortDirectionClick}
      >
        {panelChildren}
      </DocumentPanel>,
    );

    const backButton = screen.getByRole("button", { name: "Go back" });
    const forwardButton = screen.getByRole("button", { name: "Go forward" });
    const sortDirectionButton = screen.getByRole("button", {
      name: "Toggle sort direction",
    });

    await user.click(backButton);
    await user.click(forwardButton);
    await user.click(sortDirectionButton);

    expect(onBackClick).toHaveBeenCalledOnce();
    expect(onForwardClick).toHaveBeenCalledOnce();
    expect(onSortDirectionClick).toHaveBeenCalledWith("desc");
  });

  it("shows a spinner when loading", () => {
    render(
      <DocumentPanel sortOptions={sortOptions} isLoading>
        {panelChildren}
      </DocumentPanel>,
    );

    const loadingSpinner = screen.getByRole("progressbar");
    const employeeHandbook = screen.queryByText("Employee Handbook");

    expect(loadingSpinner).toBeInTheDocument();
    expect(employeeHandbook).not.toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <DocumentPanel sortOptions={sortOptions}>{panelChildren}</DocumentPanel>,
    );

    const documentPanel = container.firstChild;
    expect(documentPanel).toMatchSnapshot();
  });
});
