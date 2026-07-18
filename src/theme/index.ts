export { colorsByMode, darkColors, getColors, lightColors } from "./colors";
export type { ColorTokens, ThemeMode } from "./colors";
export { createAppTheme } from "./createAppTheme";
export { AppThemeProvider } from "./ThemeModeProvider";
export { useThemeMode } from "./useThemeMode";

import { createAppTheme } from "./createAppTheme";

export const theme = createAppTheme("light");
