import type { Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const toolbarControlsStyles: CSSProperties = {
  display: "flex",
  flexWrap: "nowrap",
  flexShrink: 0,
  alignItems: "center",
  gap: "0.5rem",
  width: "max-content",
};

export const getToolbarStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: "0.5rem 1rem",
  boxSizing: "border-box",
});
