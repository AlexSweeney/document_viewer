import { axe } from "vitest-axe";
import { expect } from "vitest";
import "./vitest-axe";

export const expectNoA11yViolations = async (container: HTMLElement) => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};
