export const textFieldSizes = ["small", "medium", "large"] as const;

export type TextFieldSize = (typeof textFieldSizes)[number];
