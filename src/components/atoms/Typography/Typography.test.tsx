import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Typography, typographyVariants } from ".";

describe("Typography", () => {
  it.each(typographyVariants)("renders the %s variant", (variant) => {
    const { container } = render(
      <Typography variant={variant}>Sample text</Typography>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it.each(typographyVariants)("matches snapshot for %s variant", (variant) => {
    const { container } = render(
      <Typography variant={variant}>Sample text</Typography>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
