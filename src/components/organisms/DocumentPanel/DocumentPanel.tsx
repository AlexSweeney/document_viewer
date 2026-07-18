import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import type { DocumentItem as DocumentItemData } from "../../../types/document";
import { IconButton } from "../../atoms/IconButton";
import { SelectField, type SelectFieldOption } from "../../atoms/SelectField";
import {
  SortDirectionButton,
  type SortDirection,
} from "../../atoms/SortDirectionButton";
import { TextField } from "../../atoms/TextField";
import { DocumentItem } from "../../molecules/DocumentItem";
import {
  containerStyles,
  getContentStyles,
  getLoadingContentStyles,
  getToolbarStyles,
  toolbarControlsStyles,
} from "./DocumentPanel.styles";

type DocumentPanelProps = {
  items: readonly DocumentItemData[];
  filterValue?: string;
  sortOptions: readonly SelectFieldOption[];
  onBackClick?: () => void;
  onForwardClick?: () => void;
  onFilterChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  onSortDirectionClick?: (direction: SortDirection) => void;
  onItemClick?: (index: number, item: DocumentItemData) => void;
  isLoading?: boolean;
};

export const DocumentPanel = ({
  items,
  filterValue,
  sortOptions,
  onBackClick,
  onForwardClick,
  onFilterChange,
  onSortChange,
  onSortDirectionClick,
  onItemClick,
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
          items.map((item, index) => (
            <DocumentItem
              key={`${item.name}-${index}`}
              item={item}
              onClick={onItemClick ? () => onItemClick(index, item) : undefined}
            />
          ))
        )}
      </div>
    </section>
  );
};
