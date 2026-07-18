import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Icon, type IconName } from "../Icon";
import type { SortDirection } from "./sortDirections";

type SortDirectionButtonProps = {
  defaultDirection?: SortDirection;
  ariaLabel: string;
  onClick?: (direction: SortDirection) => void;
};

const iconMap: Record<SortDirection, IconName> = {
  asc: "upArrow",
  desc: "downArrow",
};

export const SortDirectionButton = ({
  defaultDirection = "asc",
  ariaLabel,
  onClick,
}: SortDirectionButtonProps) => {
  const [direction, setDirection] = useState(defaultDirection);

  const handleClick = () => {
    const nextDirection = direction === "asc" ? "desc" : "asc";
    setDirection(nextDirection);
    onClick?.(nextDirection);
  };

  return (
    <IconButton aria-label={ariaLabel} color="inherit" onClick={handleClick}>
      <Icon name={iconMap[direction]} />
    </IconButton>
  );
};
