import type { SortDirection } from "../components/atoms/SortDirectionButton";
import type { DocumentItem } from "../types/document";

export type SortField = "name" | "date" | "type";

export const normalizeForFilter = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "");

export const filterDocumentItemsByName = (
  items: DocumentItem[],
  filterValue: string,
): DocumentItem[] => {
  const query = normalizeForFilter(filterValue);
  if (!query) {
    return items;
  }

  return items.filter((item) => normalizeForFilter(item.name).includes(query));
};

export const compareDocumentItems = (
  a: DocumentItem,
  b: DocumentItem,
  sortBy: SortField,
): number => {
  switch (sortBy) {
    case "name":
      return a.name.localeCompare(b.name);
    case "date": {
      const dateA = a.type === "folder" ? null : a.added;
      const dateB = b.type === "folder" ? null : b.added;

      if (dateA === null && dateB === null) {
        return 0;
      }

      if (dateA === null) {
        return 1;
      }

      if (dateB === null) {
        return -1;
      }

      return dateA.localeCompare(dateB);
    }
    case "type":
      return a.type.localeCompare(b.type);
  }
};

export const sortDocumentItems = (
  items: DocumentItem[],
  sortBy: SortField,
  sortDirection: SortDirection,
): DocumentItem[] =>
  [...items].sort((a, b) => {
    const comparison = compareDocumentItems(a, b, sortBy);
    return sortDirection === "asc" ? comparison : -comparison;
  });
