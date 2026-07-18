import MuiTypography from "@mui/material/Typography";
import { BreadCrumbs } from "../../molecules/BreadCrumbs";
import { containerStyles, textStyles } from "./Header.styles";

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
  const clickableBreadcrumbItems = breadcrumbItems.map((item, index) => ({
    label: item.label,
    onClick: () => onClickBreadCrumb(index, item),
  }));

  return (
    <header style={containerStyles}>
      <BreadCrumbs items={clickableBreadcrumbItems} />
      <div style={textStyles}>
        <MuiTypography variant="h3" component="h1" color="inherit">
          {title}
        </MuiTypography>
      </div>
    </header>
  );
};
