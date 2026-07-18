import { createTheme } from "@mui/material/styles";
import { getColors, type ThemeMode } from "./colors";

declare module "@mui/material/styles" {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface Palette {
    panel: string;
  }

  interface PaletteOptions {
    panel?: string;
  }
}

export const createAppTheme = (mode: ThemeMode) => {
  const colors = getColors(mode);

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary.main,
        dark: colors.primary.dark,
        darker: colors.primary.darker,
        light: colors.primary.light,
        contrastText: colors.primary.contrastText,
      },
      action: {
        active: colors.action.active,
      },
      background: {
        default: colors.background.default,
        paper: colors.background.panel,
      },
      panel: colors.background.panel,
    },
  });
};
