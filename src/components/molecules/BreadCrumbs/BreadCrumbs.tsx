import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { BreadCrumb } from "../../atoms/BreadCrumb";
import { Icon } from "../../atoms/Icon";

type BreadCrumbItem = {
  label: string;
  onClick: () => void;
};

type BreadCrumbsProps = {
  items: readonly BreadCrumbItem[];
};

export const BreadCrumbs = ({ items }: BreadCrumbsProps) => {
  return (
    <MuiBreadcrumbs separator={<Icon name="rightChevron" />}>
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
