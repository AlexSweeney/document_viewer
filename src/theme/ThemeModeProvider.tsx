import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo, useState, type ReactNode } from "react";
import type { ThemeMode } from "./colors";
import { createAppTheme } from "./createAppTheme";
import { ThemeModeContext } from "./themeModeContext";

type AppThemeProviderProps = {
  children: ReactNode;
  defaultMode?: ThemeMode;
};

export const AppThemeProvider = ({
  children,
  defaultMode = "light",
}: AppThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, setMode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
