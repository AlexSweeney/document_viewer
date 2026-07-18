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

const App = () => {
  const { data: documentItems, isLoading } = useDocuments();
  // array of folder names that the user has navigated to
  const [folderPath, setFolderPath] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

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
      setFolderPath((prevFolderPath) => [...prevFolderPath, item.name]);
    }
  };

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
