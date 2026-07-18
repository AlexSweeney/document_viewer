import type { Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const containerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  alignSelf: "stretch",
  minHeight: 0,
  minWidth: 0,
  width: "100%",
  borderRadius: "0.5rem",
  overflow: "hidden",
};

export const getToolbarStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  minWidth: 0,
  overflowX: "auto",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: "0.5rem 1rem",
  boxSizing: "border-box",
});

export const toolbarControlsStyles: CSSProperties = {
  display: "flex",
  flexWrap: "nowrap",
  flexShrink: 0,
  alignItems: "center",
  gap: "0.5rem",
  width: "max-content",
};

export const getContentStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  flex: 1,
  minHeight: 0,
  minWidth: 0,
  width: "100%",
  overflowY: "auto",
  flexWrap: "wrap",
  alignItems: "flex-start",
  alignContent: "flex-start",
  gap: "2rem",
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
