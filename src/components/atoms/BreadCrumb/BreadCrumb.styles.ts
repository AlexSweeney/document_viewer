import type { SxProps, Theme } from "@mui/material/styles";

export const breadCrumbStyles: SxProps<Theme> = (theme) => ({
  color: "inherit",
  verticalAlign: "inherit",
  "&.Mui-focusVisible, &:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
  },
});
