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

    const name = screen.getByText("Employee Handbook");
    const type = screen.getByText("pdf");
    const added = screen.getByText("2017-01-06");

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(added).toBeInTheDocument();
  });

  it("renders a clickable button", () => {
    render(<DocumentItem item={defaultItem} />);

    const openButton = screen.getByRole("button", {
      name: "Open Employee Handbook",
    });
    expect(openButton).toBeInTheDocument();
  });

  it("calls onClick when the container is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<DocumentItem item={defaultItem} onClick={onClick} />);

    const name = screen.getByText("Employee Handbook");
    await user.click(name);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is reachable via Tab and activates with Enter", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<DocumentItem item={defaultItem} onClick={onClick} />);

    const openButton = screen.getByRole("button", {
      name: "Open Employee Handbook",
    });

    await user.tab();

    expect(openButton).toHaveFocus();
    expect(openButton).toHaveAttribute("tabindex", "0");

    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a folder icon for folder items", () => {
    render(
      <DocumentItem item={{ name: "Documents", type: "folder", files: [] }} />,
    );

    const folderIcon = screen.getByTestId("FolderIcon");
    const type = screen.getByText("folder");

    expect(folderIcon).toBeInTheDocument();
    expect(type).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<DocumentItem item={defaultItem} />);

    const documentItem = container.firstChild;
    expect(documentItem).toMatchSnapshot();
  });
});
