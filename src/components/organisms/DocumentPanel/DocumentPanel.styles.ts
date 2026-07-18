import type { Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const containerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
  overflow: "hidden",
};

export const getToolbarStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: "0.5rem 1rem",
});

export const toolbarControlsStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

export const getContentStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  flex: 1,
  flexWrap: "wrap",
  alignItems: "flex-start",
  alignContent: "flex-start",
  gap: "2rem",
  padding: "1.5rem 1rem",
  backgroundColor: theme.palette.panel,
});

export const getLoadingContentStyles = (theme: Theme): CSSProperties => ({
  ...getContentStyles(theme),
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "center",
});
