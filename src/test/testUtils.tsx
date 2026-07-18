import {
  cleanup,
  render,
  screen,
  within,
  type RenderOptions,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { AppThemeProvider } from "../theme";

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, {
    wrapper: ({ children }) => <AppThemeProvider>{children}</AppThemeProvider>,
    ...options,
  });
}

export { cleanup, screen, userEvent, within };
export { renderWithTheme as render };
