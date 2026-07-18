import type { CSSProperties } from "react";
import type { SelectFieldSize } from "./selectFieldSizes";

const widthMap: Record<SelectFieldSize, string> = {
  small: "12rem",
  medium: "20rem",
  large: "32rem",
};

export const getSelectFieldStyles = (size: SelectFieldSize): CSSProperties => ({
  width: widthMap[size],
});
