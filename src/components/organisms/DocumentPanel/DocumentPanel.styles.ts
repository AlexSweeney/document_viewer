import type { CSSProperties } from "react";
import { theme } from "../../../theme";

export const containerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
  overflow: "hidden",
};

export const toolbarStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: theme.palette.primary.light,
  padding: "0.5rem 1rem",
};

export const toolbarControlsStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

export const contentStyles: CSSProperties = {
  display: "flex",
  flex: 1,
  flexWrap: "wrap",
  alignItems: "flex-start",
  alignContent: "flex-start",
  gap: "2rem",
  padding: "1.5rem 1rem",
  backgroundColor: "#f5f5f5",
};

export const loadingContentStyles: CSSProperties = {
  ...contentStyles,
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "center",
};
