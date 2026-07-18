import type { CSSProperties } from "react";
import type { TextFieldSize } from "./textFieldSizes";

const widthMap: Record<TextFieldSize, string> = {
  small: "12rem",
  medium: "20rem",
  large: "32rem",
};

export const getTextFieldStyles = (size: TextFieldSize): CSSProperties => ({
  width: widthMap[size],
});
