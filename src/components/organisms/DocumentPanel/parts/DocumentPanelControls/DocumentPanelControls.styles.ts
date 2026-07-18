import type { Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const getControlsStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  flexWrap: "nowrap",
  flexShrink: 0,
  alignItems: "center",
  gap: "0.5rem",
  width: "max-content",
  minWidth: "100%",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: "0.5rem 1rem",
  boxSizing: "border-box",
  borderRadius: "0.5rem 0.5rem 0 0",
});
