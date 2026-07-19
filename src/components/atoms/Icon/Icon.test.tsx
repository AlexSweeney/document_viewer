import { render } from "../../../test/testUtils";
import { describe, expect, it } from "vitest";
import { Icon, type IconName } from ".";

const names: IconName[] = [
  "leftChevron",
  "rightChevron",
  "upArrow",
  "downArrow",
  "darkMode",
  "lightMode",
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

    const icon = container.firstChild;
    expect(icon).toBeInTheDocument();
  });

  it.each(names)("matches snapshot for %s icon", (name) => {
    const { container } = render(<Icon name={name} />);

    const icon = container.firstChild;
    expect(icon).toMatchSnapshot();
  });
});
