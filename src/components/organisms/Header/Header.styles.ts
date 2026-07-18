import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const getContainerStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: "0.75rem 1rem",
});

export const headerBreadCrumbsStyles: SxProps<Theme> = (theme) => ({
  "& .MuiButtonBase-root.Mui-focusVisible, & .MuiButtonBase-root:focus-visible":
    {
      outline: `2px solid ${theme.palette.primary.contrastText}`,
      outlineOffset: "2px",
    },
});

export const titleAreaStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  whiteSpace: "nowrap",
};
