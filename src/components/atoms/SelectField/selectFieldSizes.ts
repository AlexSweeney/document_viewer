export type SelectFieldSize = "small" | "medium" | "large";

export const selectFieldSizes: SelectFieldSize[] = ["small", "medium", "large"];

type MuiSelectFieldSize = "small" | "medium";

export const muiSelectFieldSizeMap: Record<
  SelectFieldSize,
  MuiSelectFieldSize
> = {
  small: "small",
  medium: "medium",
  large: "medium",
};
