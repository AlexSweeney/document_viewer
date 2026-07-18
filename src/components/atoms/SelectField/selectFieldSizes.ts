export const selectFieldSizes = ["small", "medium", "large"] as const;

export type SelectFieldSize = (typeof selectFieldSizes)[number];
