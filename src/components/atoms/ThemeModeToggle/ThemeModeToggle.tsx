import MuiIconButton from "@mui/material/IconButton";
import { Icon, type IconName } from "../..";
import { useThemeMode } from "../../../theme";

const toggleConfig = {
  light: {
    ariaLabel: "Switch to dark mode",
    icon: "darkMode" as IconName,
  },
  dark: {
    ariaLabel: "Switch to light mode",
    icon: "lightMode" as IconName,
  },
};

export const ThemeModeToggle = () => {
  const { mode, toggleMode } = useThemeMode();
  const { ariaLabel, icon } = toggleConfig[mode];

  return (
    <MuiIconButton aria-label={ariaLabel} color="inherit" onClick={toggleMode}>
      <Icon name={icon} />
    </MuiIconButton>
  );
};
