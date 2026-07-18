import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      dark: "#1565c0",
      darker: "#0d47a1",
    },
  },
});
