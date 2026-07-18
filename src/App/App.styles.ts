import type { CSSProperties } from "react";

export const appStyles: CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export const panelWrapperStyles: CSSProperties = {
  display: "flex",
  flex: 1,
  minHeight: 0,
  minWidth: 0,
  width: "100%",
  padding: "1rem",
  boxSizing: "border-box",
  overflow: "auto",
};
