import { colors } from "../colors";

export const muiPalette = {
  mode: "light" as const,
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
};
