import type { SxProps, Theme } from "@mui/material/styles";

export const breadCrumbsStyles: SxProps<Theme> = (theme) => ({
  color: "inherit",
  flexWrap: "nowrap",
  "& .MuiButtonBase-root.Mui-focusVisible, & .MuiButtonBase-root:focus-visible":
    {
      outline: `2px solid ${theme.palette.primary.contrastText}`,
      outlineOffset: "2px",
    },
});
