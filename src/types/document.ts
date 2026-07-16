export type DocumentFileType = "pdf" | "doc" | "csv" | "mov" | "xlsx";

export type DocumentFile = {
  type: DocumentFileType;
  name: string;
  added: string;
};

export type DocumentFolder = {
  type: "folder";
  name: string;
  files: DocumentItem[];
};

export type DocumentItem = DocumentFile | DocumentFolder;
