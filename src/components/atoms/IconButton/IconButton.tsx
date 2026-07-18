import MuiIconButton from "@mui/material/IconButton";
import { Icon, type IconName } from "../Icon";

type IconButtonProps = {
  ariaLabel: string;
  icon: IconName;
  disabled?: boolean;
  onClick?: () => void;
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
