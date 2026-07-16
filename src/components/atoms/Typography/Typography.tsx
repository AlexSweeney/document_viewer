import MuiTypography from "@mui/material/Typography";
import type { ReactNode } from "react";
import type { TypographyVariant } from "./typographyVariants";

type TypographyProps = {
  variant: TypographyVariant;
  children: ReactNode;
};

export const Typography = ({ variant, children }: TypographyProps) => {
  return <MuiTypography variant={variant}>{children}</MuiTypography>;
};
