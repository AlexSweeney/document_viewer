import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import type { IconSize } from "../../atoms/Icon";

export const containerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.25rem",
  textAlign: "center",
  width: "8rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "0.5rem",
  padding: "0.5rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#eeeeee",
  },
};

export const ICON_SIZE: IconSize = "medium";

export const iconStyles: CSSProperties = {
  color: "#1565c0",
};

export const textContainerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "stretch",
  textAlign: "center",
  gap: 0,
  lineHeight: 1.2,
};
