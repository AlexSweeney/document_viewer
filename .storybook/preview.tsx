import type { Preview } from "@storybook/react-vite";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/queryClient";
import { AppThemeProvider } from "../src/theme";
import { StorybookCanvas } from "./storybookCanvas";
import { StorybookSurface } from "./storybookSurfaces";
import type { AppSurface } from "./storybookSurfaceStyles";

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => {
      const appSurface = (parameters.appSurface ?? "none") as AppSurface;
      const story =
        appSurface === "none" ? (
          <Story />
        ) : (
          <StorybookSurface surface={appSurface}>
            <Story />
          </StorybookSurface>
        );

      return (
        <QueryClientProvider client={queryClient}>
          <AppThemeProvider>
            <StorybookCanvas>{story}</StorybookCanvas>
          </AppThemeProvider>
        </QueryClientProvider>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
