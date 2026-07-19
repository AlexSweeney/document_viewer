import { alpha, type SxProps, type Theme } from "@mui/material/styles";

export const breadCrumbStyles: SxProps<Theme> = (theme) => ({
  color: "inherit",
  verticalAlign: "inherit",
  borderRadius: "0.25rem",
  "& .breadcrumb-text": {
    color: alpha(theme.palette.primary.contrastText, 0.9),
    transition: "color 0.2s",
  },
  "&:hover .breadcrumb-text": {
    color: theme.palette.primary.contrastText,
  },
  "&:active .breadcrumb-text": {
    color: theme.palette.primary.darker,
  },
  "&.Mui-focusVisible, &:focus-visible": {
    outline: `2px solid ${theme.palette.primary.contrastText}`,
    outlineOffset: "2px",
  },
});
