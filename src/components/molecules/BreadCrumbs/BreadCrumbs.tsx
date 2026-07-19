import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import type { MouseEvent } from "react";
import { BreadCrumb, Icon } from "../..";
import { breadCrumbsStyles } from "./BreadCrumbs.styles";

type BreadCrumbItem = {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
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
      {items.map((item, index) => {
        const key = `${item.label}-${index}`;

        return (
          <BreadCrumb key={key} label={item.label} onClick={item.onClick} />
        );
      })}
    </MuiBreadcrumbs>
  );
};
