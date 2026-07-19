import { useTheme } from "@mui/material/styles";
import type { CSSProperties, ReactNode } from "react";

export const StorybookCanvas = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  const canvasStyles: CSSProperties = {
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
  };

  return <div style={canvasStyles}>{children}</div>;
};
