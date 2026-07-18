import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import type { TextFieldSize } from "./textFieldSizes";

const widthMap: Record<TextFieldSize, string> = {
  small: "12rem",
  medium: "20rem",
  large: "32rem",
};

export const textFieldStyles: SxProps<Theme> = (theme) => ({
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.action.active,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.active,
  },
});

export const getTextFieldStyles = (size: TextFieldSize): CSSProperties => ({
  width: widthMap[size],
});
