import type { NoViolationsMatcherResult } from "vitest-axe/matchers";

declare module "vitest" {
  interface Assertion {
    toHaveNoViolations(): NoViolationsMatcherResult;
  }

  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): NoViolationsMatcherResult;
  }
}

export {};
