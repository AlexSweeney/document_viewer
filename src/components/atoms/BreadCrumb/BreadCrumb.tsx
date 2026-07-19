import ButtonBase from "@mui/material/ButtonBase";
import type { MouseEvent } from "react";
import { Typography } from "../..";
import { breadCrumbStyles } from "./BreadCrumb.styles";

export type BreadCrumbItem = {
  label: string;
};

export type BreadCrumbProps = {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const BreadCrumb = ({ label, onClick }: BreadCrumbProps) => {
  const ariaLabel = `Navigate to ${label}`;

  return (
    <ButtonBase
      aria-label={ariaLabel}
      disableRipple
      onClick={onClick}
      sx={breadCrumbStyles}
      tabIndex={0}
    >
      <span className="breadcrumb-text">
        <Typography variant="h6" component="span">
          {label}
        </Typography>
      </span>
    </ButtonBase>
  );
};
