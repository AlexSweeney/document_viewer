import MuiTypography from "@mui/material/Typography";
import type { ElementType, ReactNode } from "react";
import type { TypographyVariant } from "./typographyVariants";

type TypographyProps = {
  variant: TypographyVariant;
  children: ReactNode;
  component?: ElementType;
};

export const Typography = ({
  variant,
  children,
  component,
}: TypographyProps) => {
  return (
    <MuiTypography variant={variant} {...(component ? { component } : {})}>
      {children}
    </MuiTypography>
  );
};
