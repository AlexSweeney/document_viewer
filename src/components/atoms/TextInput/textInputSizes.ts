export const textInputSizes = ["small", "medium", "large"] as const;

export type TextInputSize = (typeof textInputSizes)[number];
