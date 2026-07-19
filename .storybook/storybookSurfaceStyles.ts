import type { Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import { panelWrapperStyles } from "../src/App/App.styles";
import { getContentStyles } from "../src/components/organisms/DocumentPanel/parts/DocumentPanelBody/DocumentPanelBody.styles";

export type AppSurface =
  "header" | "controls" | "panel" | "panelWrapper" | "none";

export const getStoryPanelWrapperStyles = (): CSSProperties => ({
  ...panelWrapperStyles,
  flex: 1,
  minHeight: 0,
  height: "100%",
});

export const getStoryPanelColumnWrapperStyles = (): CSSProperties => ({
  ...getStoryPanelWrapperStyles(),
  flexDirection: "column",
  alignItems: "stretch",
});

export const getStoryPanelBodyStyles = (theme: Theme): CSSProperties => ({
  ...getContentStyles(theme),
  flex: undefined,
  minHeight: "auto",
});
