import { useMemo, useState } from "react";
import { DocumentPanel } from "./components/organisms/DocumentPanel";
import { DocumentItem } from "./components/molecules/DocumentItem";
import { Header } from "./components/organisms/Header";
import { useDocuments } from "./hooks/useDocuments";
import {
  appStyles,
  panelContentStyles,
  panelWrapperStyles,
} from "./App.styles";

const title = "Document viewer";

const breadcrumbItems = [
  { label: "Home" },
  { label: "Expenses" },
  { label: "Travel" },
];

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date created" },
  { value: "type", label: "File type" },
] as const;

const normalizeForFilter = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "");

const App = () => {
  const { data: documentItems, isLoading } = useDocuments();
  const [filterValue, setFilterValue] = useState("");

  const filteredDocumentItems = useMemo(() => {
    if (!documentItems) {
      return [];
    }

    const query = normalizeForFilter(filterValue);
    if (!query) {
      return documentItems;
    }

    return documentItems.filter((item) =>
      normalizeForFilter(item.name).includes(query),
    );
  }, [documentItems, filterValue]);

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
            isLoading={isLoading}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
          >
            {filteredDocumentItems.map((item, index) => (
              <DocumentItem key={`${item.name}-${index}`} item={item} />
            ))}
          </DocumentPanel>
        </div>
      </div>
    </div>
  );
};

export default App;
