import type { DocumentItem as DocumentItemData } from "../../../types/document";
import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DocumentItem } from ".";

const defaultItem: DocumentItemData = {
  name: "Employee Handbook",
  type: "pdf",
  added: "2017-01-06",
};

afterEach(() => {
  cleanup();
});

describe("DocumentItem", () => {
  it("renders the file details", () => {
    render(<DocumentItem item={defaultItem} />);

    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    expect(screen.getByText("pdf")).toBeInTheDocument();
    expect(screen.getByText("2017-01-06")).toBeInTheDocument();
  });

  it("renders a clickable button", () => {
    render(<DocumentItem item={defaultItem} />);

    expect(
      screen.getByRole("button", { name: "Open Employee Handbook" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when the container is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<DocumentItem item={defaultItem} onClick={onClick} />);

    await user.click(screen.getByText("Employee Handbook"));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is reachable via Tab and activates with Enter", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<DocumentItem item={defaultItem} onClick={onClick} />);

    await user.tab();

    expect(
      screen.getByRole("button", { name: "Open Employee Handbook" }),
    ).toHaveFocus();
    expect(
      screen.getByRole("button", { name: "Open Employee Handbook" }),
    ).toHaveAttribute("tabindex", "0");

    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a folder icon for folder items", () => {
    render(
      <DocumentItem item={{ name: "Documents", type: "folder", files: [] }} />,
    );

    expect(screen.getByTestId("FolderIcon")).toBeInTheDocument();
    expect(screen.getByText("folder")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<DocumentItem item={defaultItem} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
