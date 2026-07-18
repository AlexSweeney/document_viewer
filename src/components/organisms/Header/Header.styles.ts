import type { Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const getContainerStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: "0.75rem 1rem",
});

export const textStyles: CSSProperties = {
  whiteSpace: "nowrap",
};
