import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { getControlsStyles } from "../src/components/organisms/DocumentPanel/parts/DocumentPanelControls/DocumentPanelControls.styles";
import { getHeaderStyles } from "../src/components/organisms/Header/Header.styles";
import type { AppSurface } from "./storybookSurfaceStyles";
import {
  getStoryPanelBodyStyles,
  getStoryPanelColumnWrapperStyles,
  getStoryPanelWrapperStyles,
} from "./storybookSurfaceStyles";

type StorybookSurfaceProps = {
  surface: AppSurface;
  children: ReactNode;
};

export const StorybookSurface = ({
  surface,
  children,
}: StorybookSurfaceProps) => {
  const theme = useTheme();

  if (surface === "header") {
    return <div style={getHeaderStyles(theme)}>{children}</div>;
  }

  if (surface === "controls") {
    return (
      <div style={getStoryPanelColumnWrapperStyles()}>
        <div style={getControlsStyles(theme)}>{children}</div>
      </div>
    );
  }

  if (surface === "panel") {
    return (
      <div style={getStoryPanelColumnWrapperStyles()}>
        <div style={getStoryPanelBodyStyles(theme)}>{children}</div>
      </div>
    );
  }

  if (surface === "panelWrapper") {
    return <div style={getStoryPanelWrapperStyles()}>{children}</div>;
  }

  return children;
};
