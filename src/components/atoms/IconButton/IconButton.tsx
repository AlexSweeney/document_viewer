import MuiIconButton from "@mui/material/IconButton";
import type { MouseEvent } from "react";
import { Icon, type IconName } from "../..";

type IconButtonProps = {
  ariaLabel: string;
  icon: IconName;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const IconButton = ({
  ariaLabel,
  icon,
  disabled,
  onClick,
}: IconButtonProps) => {
  return (
    <MuiIconButton
      aria-label={ariaLabel}
      color="inherit"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name={icon} />
    </MuiIconButton>
  );
};
