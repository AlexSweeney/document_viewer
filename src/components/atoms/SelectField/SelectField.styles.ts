import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import { theme } from "../../../theme";
import type { SelectFieldSize } from "./selectFieldSizes";

const widthMap: Record<SelectFieldSize, string> = {
  small: "12rem",
  medium: "20rem",
  large: "32rem",
};

export const selectFieldStyles: SxProps<Theme> = {
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.action.active,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.active,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiSelect-icon": {
    color: theme.palette.action.active,
  },
};

export const getSelectFieldStyles = (size: SelectFieldSize): CSSProperties => ({
  width: widthMap[size],
});
