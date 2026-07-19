import type { Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const getContentStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  flex: 1,
  flexWrap: "wrap",
  alignItems: "flex-start",
  alignContent: "flex-start",
  gap: "2rem",
  width: "100%",
  minWidth: 0,
  minHeight: 0,
  overflowX: "hidden",
  overflowY: "auto",
  padding: "1.5rem 1rem",
  backgroundColor: theme.palette.panel,
  boxSizing: "border-box",
});

export const getLoadingContentStyles = (theme: Theme): CSSProperties => ({
  ...getContentStyles(theme),
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "center",
});

export const getErrorMessageStyles = (theme: Theme): CSSProperties => ({
  color: theme.palette.error.main,
  textAlign: "center",
});
