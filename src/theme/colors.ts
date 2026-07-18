export const colors = {
  primary: {
    main: "#1976d2",
    dark: "#1565c0",
    darker: "#0d47a1",
    light: "#4791db",
    contrastText: "#ffffff",
  },
  background: {
    panel: "#f5f5f5",
    transparent: "transparent",
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
  },
} as const;

export type Colors = typeof colors;
