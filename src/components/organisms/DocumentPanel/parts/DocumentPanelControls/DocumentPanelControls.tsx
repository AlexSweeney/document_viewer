import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, MouseEvent } from "react";
import {
  IconButton,
  SelectField,
  type SelectFieldOption,
  SortDirectionButton,
  type SortDirection,
  TextField,
} from "../../../..";
import { getControlsStyles } from "./DocumentPanelControls.styles";

type DocumentPanelControlsProps = {
  filterValue?: string;
  sortOptions: readonly SelectFieldOption[];
  sortValue?: string;
  onBackClick?: () => void;
  onForwardClick?: () => void;
  isBackDisabled?: boolean;
  isForwardDisabled?: boolean;
  onFilterChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSortChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSortDirectionClick?: (
    event: MouseEvent<HTMLButtonElement>,
    direction: SortDirection,
  ) => void;
};

export const DocumentPanelControls = ({
  filterValue,
  sortOptions,
  sortValue,
  onBackClick,
  onForwardClick,
  isBackDisabled = false,
  isForwardDisabled = false,
  onFilterChange,
  onSortChange,
  onSortDirectionClick,
}: DocumentPanelControlsProps) => {
  const theme = useTheme();

  return (
    <div style={getControlsStyles(theme)}>
      <IconButton
        ariaLabel="Go back"
        icon="leftChevron"
        disabled={isBackDisabled}
        onClick={onBackClick}
      />
      <IconButton
        ariaLabel="Go forward"
        icon="rightChevron"
        disabled={isForwardDisabled}
        onClick={onForwardClick}
      />
      <TextField
        label="filter by name"
        size="small"
        value={filterValue}
        onChange={onFilterChange}
      />
      <SelectField
        label="sort by"
        size="small"
        value={sortValue}
        options={sortOptions}
        onChange={onSortChange}
      />
      <SortDirectionButton
        ariaLabel="Toggle sort direction"
        onClick={onSortDirectionClick}
      />
    </div>
  );
};
