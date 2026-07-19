import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import { iconSizeMap, type IconSize } from "../..";

export const containerStyles: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "flex-start",
  justifyContent: "flex-start",
  gap: "0.25rem",
  textAlign: "center",
  width: "8rem",
  backgroundColor: "transparent",
  padding: "0.5rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:active": {
    backgroundColor: "transparent",
  },
  "&.Mui-focusVisible, &:focus-visible": {
    backgroundColor: "transparent",
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
  },
  "&.Mui-focusVisible .document-item-icon, &:focus-visible .document-item-icon, &.Mui-focusVisible .document-item-text, &:focus-visible .document-item-text":
    {
      color: theme.palette.primary.main,
    },
  "& .document-item-icon": {
    color: theme.palette.primary.dark,
    cursor: "pointer",
  },
  "& .document-item-text": {
    cursor: "pointer",
  },
  "&:hover .document-item-icon, &:hover .document-item-text": {
    color: theme.palette.primary.main,
  },
  "&:active .document-item-icon, &:active .document-item-text": {
    color: theme.palette.primary.darker,
  },
});

export const ICON_SIZE: IconSize = "medium";

export const iconStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: iconSizeMap[ICON_SIZE],
  width: "100%",
  flexShrink: 0,
  cursor: "pointer",
  transition: "color 0.2s",
};

export const textContainerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "stretch",
  textAlign: "center",
  gap: 0,
  lineHeight: 1.2,
  cursor: "pointer",
  transition: "color 0.2s",
};
