import type { SxProps, Theme } from "@mui/material/styles";
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
  sx?: SxProps<Theme>;
};

export const BreadCrumbs = ({ items, sx }: BreadCrumbsProps) => {
  return (
    <MuiBreadcrumbs
      aria-label="bread crumbs navigation"
      separator={<Icon name="rightChevron" />}
      sx={[breadCrumbsStyles, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
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
