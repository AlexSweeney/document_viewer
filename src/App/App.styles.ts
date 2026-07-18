import type { CSSProperties } from "react";

export const appStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

export const panelWrapperStyles: CSSProperties = {
  display: "flex",
  flex: 1,
  minHeight: 0,
  width: "100%",
  padding: "1rem",
  boxSizing: "border-box",
};

export const panelContentStyles: CSSProperties = {
  flex: 1,
  minHeight: 0,
  width: "100%",
  height: "100%",
};
