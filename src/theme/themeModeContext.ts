import { createContext } from "react";
import type { ThemeMode } from "./colors";

export type ThemeModeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<
  ThemeModeContextValue | undefined
>(undefined);
