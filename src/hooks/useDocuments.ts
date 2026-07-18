import { useQuery } from "@tanstack/react-query";
import { fetchDocuments } from "../api/documents";

export const documentsQueryKey = ["documents"] as const;

export const useDocuments = () =>
  useQuery({
    queryKey: documentsQueryKey,
    queryFn: fetchDocuments,
  });
