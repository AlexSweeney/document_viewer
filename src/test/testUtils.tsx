import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import type { ThemeMode } from "../theme/colors";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { themeMode?: ThemeMode },
) {
  const { themeMode = "light", ...renderOptions } = options ?? {};
  const queryClient = createTestQueryClient();

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider defaultMode={themeMode}>{children}</AppThemeProvider>
      </QueryClientProvider>
    ),
    ...renderOptions,
  });
}

export { cleanup, screen, userEvent, within };
export { renderWithTheme as render };
