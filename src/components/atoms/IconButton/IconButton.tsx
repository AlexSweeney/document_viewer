import MuiIconButton from "@mui/material/IconButton";
import { Icon, type IconName } from "../Icon";

type IconButtonProps = {
  ariaLabel: string;
  icon: IconName;
  onClick?: () => void;
};

export const IconButton = ({ ariaLabel, icon, onClick }: IconButtonProps) => {
  return (
    <MuiIconButton aria-label={ariaLabel} onClick={onClick}>
      <Icon name={icon} />
    </MuiIconButton>
  );
};
