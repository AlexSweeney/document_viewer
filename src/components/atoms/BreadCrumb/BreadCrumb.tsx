import ButtonBase from "@mui/material/ButtonBase";
import type { MouseEvent } from "react";
import { Typography } from "../Typography";
import { breadCrumbStyles } from "./BreadCrumb.styles";

export type BreadCrumbItem = {
  label: string;
};

export type BreadCrumbProps = {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const BreadCrumb = ({ label, onClick }: BreadCrumbProps) => {
  return (
    <ButtonBase
      aria-label={`Navigate to ${label}`}
      onClick={onClick}
      sx={breadCrumbStyles}
      tabIndex={0}
    >
      <Typography variant="h6" component="span">
        {label}
      </Typography>
    </ButtonBase>
  );
};
