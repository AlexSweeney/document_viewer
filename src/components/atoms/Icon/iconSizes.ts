export const iconSizes = ["small", "medium", "large"] as const;

export type IconSize = (typeof iconSizes)[number];

export const iconSizeMap = {
  small: "1.75rem",
  medium: "2rem",
  large: "2.25rem",
} as const satisfies Record<IconSize, string>;
