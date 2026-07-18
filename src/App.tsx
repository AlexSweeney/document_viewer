import { useMemo, useState } from "react";
import { DocumentPanel } from "./components/organisms/DocumentPanel";
import { DocumentItem } from "./components/molecules/DocumentItem";
import { Header } from "./components/organisms/Header";
import type { SortDirection } from "./components/atoms/SortDirectionButton";
import { useDocuments } from "./hooks/useDocuments";
import type { DocumentItem as DocumentItemData } from "./types/document";
import {
  filterDocumentItemsByName,
  getDocumentItemsAtPath,
  sortDocumentItems,
  type SortField,
} from "./utils/documents";
import {
  appStyles,
  panelContentStyles,
  panelWrapperStyles,
} from "./App.styles";

const title = "Document viewer";

const breadcrumbItems = [{ label: "Home" }];

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date created" },
  { value: "type", label: "File type" },
] as const;

type FolderNavigationState = {
  history: string[][];
  index: number;
};

const initialFolderNavigation: FolderNavigationState = {
  history: [[]],
  index: 0,
};

const App = () => {
  const { data: documentItems, isLoading } = useDocuments();
  const [folderNavigation, setFolderNavigation] =
    useState<FolderNavigationState>(initialFolderNavigation);
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const folderPath = folderNavigation.history[folderNavigation.index];

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

  const handleItemClick = (item: DocumentItemData) => {
    if (item.type === "folder") {
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
    }
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

  const isBackDisabled = folderNavigation.index === 0;
  const isForwardDisabled =
    folderNavigation.index === folderNavigation.history.length - 1;

  return (
    <div style={appStyles}>
      <Header
        breadcrumbItems={breadcrumbItems}
        title={title}
        onClickBreadCrumb={() => {}}
      />
      <div style={panelWrapperStyles}>
        <div style={panelContentStyles}>
          <DocumentPanel
            sortOptions={sortOptions}
            sortValue={sortBy}
            isLoading={isLoading}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            onSortChange={(value) => setSortBy(value as SortField)}
            onSortDirectionClick={setSortDirection}
            onBackClick={handleBackClick}
            onForwardClick={handleForwardClick}
            isBackDisabled={isBackDisabled}
            isForwardDisabled={isForwardDisabled}
          >
            {sortedDocuments.map((item, index) => (
              <DocumentItem
                key={`${item.name}-${index}`}
                item={item}
                onClick={
                  item.type === "folder"
                    ? () => handleItemClick(item)
                    : undefined
                }
              />
            ))}
          </DocumentPanel>
        </div>
      </div>
    </div>
  );
};

export default App;
