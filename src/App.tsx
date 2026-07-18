import { DocumentPanel } from "./components/organisms/DocumentPanel";
import { Header } from "./components/organisms/Header";
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
];

const items = [
  { name: "Employee Handbook", type: "pdf", dateCreated: "2017-01-06" },
  { name: "Q4 Report", type: "xlsx", dateCreated: "2018-03-12" },
  { name: "Documents", type: "folder", dateCreated: "2016-11-02" },
] as const;

const App = () => {
  return (
    <div style={appStyles}>
      <Header
        breadcrumbItems={breadcrumbItems}
        title={title}
        onClickBreadCrumb={() => {}}
      />
      <div style={panelWrapperStyles}>
        <div style={panelContentStyles}>
          <DocumentPanel items={items} sortOptions={sortOptions} />
        </div>
      </div>
    </div>
  );
};

export default App;
