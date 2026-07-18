export type ThemeMode = "light" | "dark";

export type ColorTokens = {
  primary: {
    main: string;
    dark: string;
    darker: string;
    light: string;
    contrastText: string;
  };
  background: {
    default: string;
    panel: string;
  };
  action: {
    active: string;
  };
};

export const lightColors: ColorTokens = {
  primary: {
    main: "#1976d2",
    dark: "#1565c0",
    darker: "#0d47a1",
    light: "#4791db",
    contrastText: "#ffffff",
  },
  background: {
    default: "#ffffff",
    panel: "#f5f5f5",
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
  },
};

export const darkColors: ColorTokens = {
  primary: {
    main: "#1565c0",
    dark: "#64b5f6",
    darker: "#42a5f5",
    light: "#1976d2",
    contrastText: "#ffffff",
  },
  background: {
    default: "#121212",
    panel: "#1e2433",
  },
  action: {
    active: "rgba(255, 255, 255, 0.56)",
  },
};

export const colorsByMode: Record<ThemeMode, ColorTokens> = {
  light: lightColors,
  dark: darkColors,
};

export const getColors = (mode: ThemeMode): ColorTokens => colorsByMode[mode];
