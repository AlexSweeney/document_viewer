import type { DocumentItemType } from "../../../types/document";
import { cleanup, render, screen, userEvent } from "../../../test/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DocumentItem } from ".";

const defaultProps: {
  name: string;
  type: DocumentItemType;
  dateCreated: string;
} = {
  name: "Employee Handbook",
  type: "pdf",
  dateCreated: "2017-01-06",
};

afterEach(() => {
  cleanup();
});

describe("DocumentItem", () => {
  it("renders the file details", () => {
    render(<DocumentItem {...defaultProps} />);

    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    expect(screen.getByText("pdf")).toBeInTheDocument();
    expect(screen.getByText("2017-01-06")).toBeInTheDocument();
  });

  it("renders a clickable button", () => {
    render(<DocumentItem {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: "Open Employee Handbook" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when the container is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<DocumentItem {...defaultProps} onClick={onClick} />);

    await user.click(screen.getByText("Employee Handbook"));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a folder icon for folder items", () => {
    render(<DocumentItem {...defaultProps} name="Documents" type="folder" />);

    expect(screen.getByTestId("FolderIcon")).toBeInTheDocument();
    expect(screen.getByText("folder")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<DocumentItem {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
