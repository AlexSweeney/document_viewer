import { useTheme } from "@mui/material/styles";
import { IconButton } from "../../../../atoms/IconButton";
import {
  SelectField,
  type SelectFieldOption,
} from "../../../../atoms/SelectField";
import {
  SortDirectionButton,
  type SortDirection,
} from "../../../../atoms/SortDirectionButton";
import { TextField } from "../../../../atoms/TextField";
import { getControlsStyles } from "./DocumentPanelControls.styles";

type DocumentPanelControlsProps = {
  filterValue?: string;
  sortOptions: readonly SelectFieldOption[];
  sortValue?: string;
  onBackClick?: () => void;
  onForwardClick?: () => void;
  isBackDisabled?: boolean;
  isForwardDisabled?: boolean;
  onFilterChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  onSortDirectionClick?: (direction: SortDirection) => void;
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
