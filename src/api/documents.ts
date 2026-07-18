import { mockDocuments } from "../mock-data/documents";
import type { DocumentItem } from "../types/document";

const API_DELAY_MS = 1000;

export const fetchDocuments = async (): Promise<DocumentItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));

  return mockDocuments;
};
