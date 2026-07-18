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

const App = () => {
  const { data: documentItems, isLoading } = useDocuments();

  return (
    <div style={appStyles}>
      <Header
        breadcrumbItems={breadcrumbItems}
        title={title}
        onClickBreadCrumb={() => {}}
      />
      <div style={panelWrapperStyles}>
        <div style={panelContentStyles}>
          <DocumentPanel sortOptions={sortOptions} isLoading={isLoading}>
            {documentItems?.map((item, index) => (
              <DocumentItem key={`${item.name}-${index}`} item={item} />
            ))}
          </DocumentPanel>
        </div>
      </div>
    </div>
  );
};

export default App;
