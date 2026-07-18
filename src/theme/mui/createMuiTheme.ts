import { createTheme } from "@mui/material/styles";
import { muiComponentOverrides } from "./components";
import { muiPalette } from "./palette";

declare module "@mui/material/styles" {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

export const muiTheme = createTheme({
  palette: muiPalette,
  components: muiComponentOverrides,
});
