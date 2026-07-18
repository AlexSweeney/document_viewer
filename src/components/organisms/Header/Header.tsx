import { useTheme } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";
import type { BreadCrumbItem } from "../../atoms/BreadCrumb";
import { ThemeModeToggle } from "../../atoms/ThemeModeToggle";
import { BreadCrumbs } from "../../molecules/BreadCrumbs";
import {
  getContainerStyles,
  headerBreadCrumbsStyles,
  titleAreaStyles,
} from "./Header.styles";

type HeaderProps = {
  breadCrumbItems: readonly BreadCrumbItem[];
  onClickBreadCrumb: (index: number, item: BreadCrumbItem) => void;
  title: string;
};

export const Header = ({
  breadCrumbItems,
  onClickBreadCrumb,
  title,
}: HeaderProps) => {
  const theme = useTheme();
  const clickableBreadCrumbItems = breadCrumbItems.map((item, index) => ({
    label: item.label,
    onClick: () => onClickBreadCrumb(index, item),
  }));

  return (
    <header style={getContainerStyles(theme)}>
      <BreadCrumbs
        items={clickableBreadCrumbItems}
        sx={headerBreadCrumbsStyles}
      />
      <div style={titleAreaStyles}>
        <MuiTypography variant="h3" component="h1" color="inherit">
          {title}
        </MuiTypography>
        <ThemeModeToggle />
      </div>
    </header>
  );
};
