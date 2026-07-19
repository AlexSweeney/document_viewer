import { useTheme } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";
import type { BreadCrumbItem } from "../../atoms/BreadCrumb";
import { ThemeModeToggle } from "../../atoms/ThemeModeToggle";
import { BreadCrumbs } from "../../molecules/BreadCrumbs";
import {
  getHeaderStyles,
  breadCrumbsAreaStyles,
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
  const clickableBreadCrumbItems = breadCrumbItems.map((item, index) => {
    const clickHandler = () => onClickBreadCrumb(index, item);

    return {
      label: item.label,
      onClick: clickHandler,
    };
  });

  return (
    <header style={getHeaderStyles(theme)}>
      <div style={breadCrumbsAreaStyles}>
        <BreadCrumbs items={clickableBreadCrumbItems} />
      </div>
      <div style={titleAreaStyles}>
        <MuiTypography variant="h3" component="h1" color="inherit">
          {title}
        </MuiTypography>
        <ThemeModeToggle />
      </div>
    </header>
  );
};
