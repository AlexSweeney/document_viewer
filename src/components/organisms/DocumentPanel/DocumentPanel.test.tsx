import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DocumentPanel } from ".";

const items = [
  {
    name: "Employee Handbook",
    type: "pdf" as const,
    dateCreated: "2017-01-06",
  },
  { name: "Q4 Report", type: "xlsx" as const, dateCreated: "2018-03-12" },
  { name: "Documents", type: "folder" as const, dateCreated: "2016-11-02" },
];

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
    render(<DocumentPanel items={items} sortOptions={sortOptions} />);

    expect(screen.getByRole("button", { name: "Go back" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go forward" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle sort direction" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("filter by name")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "sort by" }),
    ).toBeInTheDocument();
  });

  it("renders document items", () => {
    render(<DocumentPanel items={items} sortOptions={sortOptions} />);

    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    expect(screen.getByText("Q4 Report")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  it("calls onItemClick with the item index and item when a document is clicked", async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    render(
      <DocumentPanel
        items={items}
        sortOptions={sortOptions}
        onItemClick={onItemClick}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Q4 Report" }));

    expect(onItemClick).toHaveBeenCalledOnce();
    expect(onItemClick).toHaveBeenCalledWith(1, items[1]);
  });

  it("calls toolbar handlers when clicked", async () => {
    const user = userEvent.setup();
    const onBackClick = vi.fn();
    const onForwardClick = vi.fn();
    const onSortDirectionClick = vi.fn();
    render(
      <DocumentPanel
        items={items}
        sortOptions={sortOptions}
        onBackClick={onBackClick}
        onForwardClick={onForwardClick}
        onSortDirectionClick={onSortDirectionClick}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Go back" }));
    await user.click(screen.getByRole("button", { name: "Go forward" }));
    await user.click(
      screen.getByRole("button", { name: "Toggle sort direction" }),
    );

    expect(onBackClick).toHaveBeenCalledOnce();
    expect(onForwardClick).toHaveBeenCalledOnce();
    expect(onSortDirectionClick).toHaveBeenCalledWith("desc");
  });

  it("shows a spinner when loading", () => {
    render(<DocumentPanel items={items} sortOptions={sortOptions} isLoading />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Employee Handbook")).not.toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <DocumentPanel items={items} sortOptions={sortOptions} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
