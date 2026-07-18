import type { ReactNode } from "react";
import type { SelectFieldOption } from "../../atoms/SelectField";
import type { SortDirection } from "../../atoms/SortDirectionButton";
import { containerStyles } from "./DocumentPanel.styles";
import { DocumentPanelBody, DocumentPanelControls } from "./parts";

type DocumentPanelProps = {
  children?: ReactNode;
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
  isLoading?: boolean;
};

export const DocumentPanel = ({
  children,
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
  isLoading = false,
}: DocumentPanelProps) => {
  return (
    <section style={containerStyles}>
      <DocumentPanelControls
        filterValue={filterValue}
        sortOptions={sortOptions}
        sortValue={sortValue}
        onBackClick={onBackClick}
        onForwardClick={onForwardClick}
        isBackDisabled={isBackDisabled}
        isForwardDisabled={isForwardDisabled}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        onSortDirectionClick={onSortDirectionClick}
      />
      <DocumentPanelBody isLoading={isLoading}>{children}</DocumentPanelBody>
    </section>
  );
};
