import IconButton from "@mui/material/IconButton";
import { useState, type MouseEvent } from "react";
import { Icon, type IconName } from "../..";
import type { SortDirection } from "./sortDirections";

type SortDirectionButtonProps = {
  defaultDirection?: SortDirection;
  ariaLabel: string;
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    direction: SortDirection,
  ) => void;
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

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const nextDirection = direction === "asc" ? "desc" : "asc";
    setDirection(nextDirection);
    onClick?.(event, nextDirection);
  };

  return (
    <IconButton aria-label={ariaLabel} color="inherit" onClick={clickHandler}>
      <Icon name={iconMap[direction]} />
    </IconButton>
  );
};
