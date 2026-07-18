import { useTheme } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";
import { ThemeModeToggle } from "../../atoms/ThemeModeToggle";
import { BreadCrumbs } from "../../molecules/BreadCrumbs";
import { getContainerStyles, titleAreaStyles } from "./Header.styles";

type BreadCrumbItem = {
  label: string;
};

type HeaderProps = {
  breadcrumbItems: readonly BreadCrumbItem[];
  onClickBreadCrumb: (index: number, item: BreadCrumbItem) => void;
  title: string;
};

export const Header = ({
  breadcrumbItems,
  onClickBreadCrumb,
  title,
}: HeaderProps) => {
  const theme = useTheme();
  const clickableBreadcrumbItems = breadcrumbItems.map((item, index) => ({
    label: item.label,
    onClick: () => onClickBreadCrumb(index, item),
  }));

  return (
    <header style={getContainerStyles(theme)}>
      <BreadCrumbs items={clickableBreadcrumbItems} />
      <div style={titleAreaStyles}>
        <MuiTypography variant="h3" component="h1" color="inherit">
          {title}
        </MuiTypography>
        <ThemeModeToggle />
      </div>
    </header>
  );
};
