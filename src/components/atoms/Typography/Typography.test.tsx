import { render } from "../../../test/testUtils";
import { describe, expect, it } from "vitest";
import { Typography, typographyVariants } from ".";

describe("Typography", () => {
  it.each(typographyVariants)("renders the %s variant", (variant) => {
    const { container } = render(
      <Typography variant={variant}>Sample text</Typography>,
    );

    const typography = container.firstChild;
    expect(typography).toBeInTheDocument();
  });

  it.each(typographyVariants)("matches snapshot for %s variant", (variant) => {
    const { container } = render(
      <Typography variant={variant}>Sample text</Typography>,
    );

    const typography = container.firstChild;
    expect(typography).toMatchSnapshot();
  });
});
