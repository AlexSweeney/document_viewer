import type { ChangeEvent, MouseEvent, ReactNode } from "react";
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
  onFilterChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSortChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSortDirectionClick?: (
    event: MouseEvent<HTMLButtonElement>,
    direction: SortDirection,
  ) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
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
  isError = false,
  errorMessage,
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
      <DocumentPanelBody
        errorMessage={errorMessage}
        isError={isError}
        isLoading={isLoading}
      >
        {children}
      </DocumentPanelBody>
    </section>
  );
};
