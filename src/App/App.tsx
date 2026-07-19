import { useMemo, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { DocumentPanel } from "../components/organisms/DocumentPanel";
import { DocumentItem } from "../components/molecules/DocumentItem";
import { Header } from "../components/organisms/Header";
import type { SortDirection } from "../components/atoms/SortDirectionButton";
import { useDocuments } from "../hooks/useDocuments";
import type { DocumentItem as DocumentItemData } from "../types/document";
import {
  filterDocumentItemsByName,
  getBreadCrumbItems,
  getDocumentItemsAtPath,
  sortDocumentItems,
  type SortField,
} from "../utils/documents";
import { appStyles, panelWrapperStyles } from "../App/App.styles";

const APP_TITLE = "Document viewer";

const DOCUMENTS_ERROR_MESSAGE =
  "Failed to load documents. Please refresh the page.";

type SortOption = {
  value: SortField;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date created" },
  { value: "type", label: "File type" },
];

type FolderNavigationState = {
  history: string[][];
  index: number;
};

const initialFolderNavigation: FolderNavigationState = {
  history: [[]],
  index: 0,
};

const App = () => {
  const { data: documentItems, isError, isLoading } = useDocuments();
  const [folderNavigation, setFolderNavigation] =
    useState<FolderNavigationState>(initialFolderNavigation);
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const folderPath = folderNavigation.history[folderNavigation.index];

  const breadCrumbItems = useMemo(
    () => getBreadCrumbItems(folderPath),
    [folderPath],
  );

  const currentDocumentItems = useMemo(
    () => getDocumentItemsAtPath(documentItems ?? [], folderPath),
    [documentItems, folderPath],
  );

  const filteredDocumentItems = useMemo(
    () => filterDocumentItemsByName(currentDocumentItems, filterValue),
    [currentDocumentItems, filterValue],
  );

  const sortedDocuments = useMemo(
    () => sortDocumentItems(filteredDocumentItems, sortBy, sortDirection),
    [filteredDocumentItems, sortBy, sortDirection],
  );

  const handleDocumentItemClick = (item: DocumentItemData) => {
    if (item.type !== "folder") {
      return;
    }

    setFolderNavigation(({ history, index }) => {
      // Path after opening the clicked folder.
      const nextFolderPath = [...history[index], item.name];
      // Drop any forward history and append the new path.
      const nextHistory = [...history.slice(0, index + 1), nextFolderPath];

      return {
        history: nextHistory,
        index: index + 1,
      };
    });
  };

  const handleBackClick = () => {
    setFolderNavigation(({ history, index }) => ({
      history,
      index: index - 1,
    }));
  };

  const handleForwardClick = () => {
    setFolderNavigation(({ history, index }) => ({
      history,
      index: index + 1,
    }));
  };

  const handleBreadCrumbClick = (index: number) => {
    setFolderNavigation(({ history, index: currentIndex }) => {
      const currentPath = history[currentIndex];
      // BreadCrumb index 0 is Home; each later index adds one folder segment.
      const targetPath = currentPath.slice(0, index);

      // Already at this BreadCrumb — nothing to do.
      if (targetPath.length === currentPath.length) {
        return { history, index: currentIndex };
      }

      // Drop any forward history and append the target path.
      const nextHistory = [...history.slice(0, currentIndex + 1), targetPath];

      return {
        history: nextHistory,
        index: currentIndex + 1,
      };
    });
  };

  const isBackDisabled = folderNavigation.index === 0;
  const isForwardDisabled =
    folderNavigation.index === folderNavigation.history.length - 1;

  const filterChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const sortChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const sortOption = sortOptions.find(
      (option) => option.value === event.target.value,
    );

    if (sortOption) {
      setSortBy(sortOption.value);
    }
  };

  const sortDirectionClickHandler = (
    _event: MouseEvent<HTMLButtonElement>,
    direction: SortDirection,
  ) => {
    setSortDirection(direction);
  };

  return (
    <div style={appStyles}>
      <Header
        breadCrumbItems={breadCrumbItems}
        title={APP_TITLE}
        onClickBreadCrumb={handleBreadCrumbClick}
      />
      <main style={panelWrapperStyles}>
        <DocumentPanel
          sortOptions={sortOptions}
          sortValue={sortBy}
          isError={isError}
          isLoading={isLoading}
          errorMessage={DOCUMENTS_ERROR_MESSAGE}
          filterValue={filterValue}
          onFilterChange={filterChangeHandler}
          onSortChange={sortChangeHandler}
          onSortDirectionClick={sortDirectionClickHandler}
          onBackClick={handleBackClick}
          onForwardClick={handleForwardClick}
          isBackDisabled={isBackDisabled}
          isForwardDisabled={isForwardDisabled}
        >
          {sortedDocuments.map((item, index) => {
            const key = `${item.name}-${index}`;
            const clickHandler = () => handleDocumentItemClick(item);

            return (
              <DocumentItem key={key} item={item} onClick={clickHandler} />
            );
          })}
        </DocumentPanel>
      </main>
    </div>
  );
};

export default App;
