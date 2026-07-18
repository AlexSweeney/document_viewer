import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Icon } from "../Icon";
import type { SortDirection } from "./sortDirections";

type SortDirectionButtonProps = {
  defaultDirection?: SortDirection;
  ariaLabel: string;
  onClick?: (direction: SortDirection) => void;
};

const iconMap = {
  asc: "upArrow",
  desc: "downArrow",
} as const satisfies Record<SortDirection, "upArrow" | "downArrow">;

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
    <IconButton aria-label={ariaLabel} onClick={handleClick}>
      <Icon name={iconMap[direction]} />
    </IconButton>
  );
};
