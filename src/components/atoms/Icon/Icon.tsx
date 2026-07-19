import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  DarkMode as DarkModeIcon,
  Description as DescriptionIcon,
  Folder as FolderIcon,
  LightMode as LightModeIcon,
  Movie as MovieIcon,
  PictureAsPdf as PictureAsPdfIcon,
  TableChart as TableChartIcon,
  TableView as TableViewIcon,
} from "@mui/icons-material";
import type { ElementType } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { DocumentItemType } from "../../../types/document";
import { iconSizeMap, type IconSize } from "./iconSizes";

export type IconName =
  | "leftChevron"
  | "rightChevron"
  | "upArrow"
  | "downArrow"
  | "darkMode"
  | "lightMode"
  | DocumentItemType;

const iconMap: Record<IconName, ElementType<SvgIconProps>> = {
  leftChevron: ChevronLeftIcon,
  rightChevron: ChevronRightIcon,
  upArrow: ArrowUpwardIcon,
  downArrow: ArrowDownwardIcon,
  darkMode: DarkModeIcon,
  lightMode: LightModeIcon,
  pdf: PictureAsPdfIcon,
  doc: DescriptionIcon,
  csv: TableChartIcon,
  mov: MovieIcon,
  xlsx: TableViewIcon,
  folder: FolderIcon,
};

export type IconProps = {
  name: IconName;
  size?: IconSize;
};

export const Icon = ({ name, size = "medium" }: IconProps) => {
  const IconComponent = iconMap[name];

  return (
    <IconComponent sx={{ fontSize: iconSizeMap[size], color: "inherit" }} />
  );
};
