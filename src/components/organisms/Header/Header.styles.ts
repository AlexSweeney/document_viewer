import type { Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const getHeaderStyles = (theme: Theme): CSSProperties => ({
  width: "100%",
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: "0.75rem 1rem",
});

export const breadCrumbsAreaStyles: CSSProperties = {
  flexShrink: 0,
};

export const titleAreaStyles: CSSProperties = {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: "0.25rem",
  whiteSpace: "nowrap",
};
