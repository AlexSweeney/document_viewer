import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import MovieIcon from "@mui/icons-material/Movie";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableViewIcon from "@mui/icons-material/TableView";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { DocumentItemType } from "../../../types/document";
import { iconSizeMap, type IconSize } from "./iconSizes";

export type IconName =
  "leftChevron" | "rightChevron" | "upArrow" | "downArrow" | DocumentItemType;

const iconMap = {
  leftChevron: ChevronLeftIcon,
  rightChevron: ChevronRightIcon,
  upArrow: ArrowUpwardIcon,
  downArrow: ArrowDownwardIcon,
  pdf: PictureAsPdfIcon,
  doc: DescriptionIcon,
  csv: TableChartIcon,
  mov: MovieIcon,
  xlsx: TableViewIcon,
  folder: FolderIcon,
} as const satisfies Record<IconName, React.ElementType<SvgIconProps>>;

export type IconProps = {
  name: IconName;
  size?: IconSize;
};

export const Icon = ({ name, size = "medium" }: IconProps) => {
  const IconComponent = iconMap[name];

  return <IconComponent sx={{ fontSize: iconSizeMap[size] }} />;
};
