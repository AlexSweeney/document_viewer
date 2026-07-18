import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import type { SelectFieldSize } from "./selectFieldSizes";

const widthMap: Record<SelectFieldSize, string> = {
  small: "12rem",
  medium: "20rem",
  large: "32rem",
};

const filledInputBackground = (theme: Theme) => ({
  backgroundColor: theme.palette.panel,
});

export const selectFieldStyles: SxProps<Theme> = (theme) => ({
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.action.active,
  },
  "& .MuiFilledInput-root": filledInputBackground(theme),
  "& .MuiFilledInput-root:hover": filledInputBackground(theme),
  "& .MuiFilledInput-root.Mui-focused": {
    ...filledInputBackground(theme),
  },
  "& .MuiFilledInput-root.Mui-focused:after": {
    borderBottomColor: theme.palette.action.active,
  },
  "& .MuiFilledInput-root.Mui-focused .MuiSelect-icon": {
    color: theme.palette.action.active,
  },
});

export const getSelectFieldStyles = (size: SelectFieldSize): CSSProperties => ({
  width: widthMap[size],
});
