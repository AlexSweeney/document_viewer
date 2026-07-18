import type { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton } from "../../atoms/IconButton";
import { SelectField, type SelectFieldOption } from "../../atoms/SelectField";
import {
  SortDirectionButton,
  type SortDirection,
} from "../../atoms/SortDirectionButton";
import { TextField } from "../../atoms/TextField";
import {
  containerStyles,
  getContentStyles,
  getLoadingContentStyles,
  getToolbarStyles,
  toolbarControlsStyles,
} from "./DocumentPanel.styles";

type DocumentPanelProps = {
  children?: ReactNode;
  filterValue?: string;
  sortOptions: readonly SelectFieldOption[];
  onBackClick?: () => void;
  onForwardClick?: () => void;
  onFilterChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  onSortDirectionClick?: (direction: SortDirection) => void;
  isLoading?: boolean;
};

export const DocumentPanel = ({
  children,
  filterValue,
  sortOptions,
  onBackClick,
  onForwardClick,
  onFilterChange,
  onSortChange,
  onSortDirectionClick,
  isLoading = false,
}: DocumentPanelProps) => {
  const theme = useTheme();

  return (
    <section style={containerStyles}>
      <div style={getToolbarStyles(theme)}>
        <div style={toolbarControlsStyles}>
          <IconButton
            ariaLabel="Go back"
            icon="leftChevron"
            onClick={onBackClick}
          />
          <IconButton
            ariaLabel="Go forward"
            icon="rightChevron"
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
            options={sortOptions}
            onChange={onSortChange}
          />
          <SortDirectionButton
            ariaLabel="Toggle sort direction"
            onClick={onSortDirectionClick}
          />
        </div>
      </div>
      <div
        style={
          isLoading ? getLoadingContentStyles(theme) : getContentStyles(theme)
        }
      >
        {isLoading ? (
          <CircularProgress aria-label="Loading documents" />
        ) : (
          children
        )}
      </div>
    </section>
  );
};
