import type { SxProps, Theme } from "@mui/material/styles";

export const breadCrumbsStyles: SxProps<Theme> = {
  color: "inherit",
  "& .MuiBreadcrumbs-ol": {
    flexWrap: "nowrap",
    paddingRight: 2,
  },
};
