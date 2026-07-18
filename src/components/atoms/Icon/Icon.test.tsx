import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon, type IconName } from ".";

const names: IconName[] = [
  "leftChevron",
  "rightChevron",
  "upArrow",
  "downArrow",
  "pdf",
  "doc",
  "csv",
  "mov",
  "xlsx",
  "folder",
];

describe("Icon", () => {
  it.each(names)("renders the %s icon", (name) => {
    const { container } = render(<Icon name={name} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it.each(names)("matches snapshot for %s icon", (name) => {
    const { container } = render(<Icon name={name} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
