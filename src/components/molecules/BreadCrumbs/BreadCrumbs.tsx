import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { BreadCrumb } from "../../atoms/BreadCrumb";
import { Icon } from "../../atoms/Icon";
import { breadCrumbsStyles } from "./BreadCrumbs.styles";

type BreadCrumbItem = {
  label: string;
  onClick: () => void;
};

type BreadCrumbsProps = {
  items: readonly BreadCrumbItem[];
};

export const BreadCrumbs = ({ items }: BreadCrumbsProps) => {
  return (
    <MuiBreadcrumbs
      aria-label="bread crumbs navigation"
      separator={<Icon name="rightChevron" />}
      sx={breadCrumbsStyles}
    >
      {items.map((item, index) => (
        <BreadCrumb
          key={`${item.label}-${index}`}
          label={item.label}
          onClick={item.onClick}
        />
      ))}
    </MuiBreadcrumbs>
  );
};
