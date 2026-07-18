import "@testing-library/jest-dom/vitest";
import "./vitest-axe";
import * as matchers from "vitest-axe/matchers";
import { expect } from "vitest";

expect.extend(matchers);
