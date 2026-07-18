import { colors } from "./colors";

export const appTheme = {
  colors,
} as const;

export type AppTheme = typeof appTheme;
