import { describe, expect, it } from "vitest";
import type { DocumentItem } from "../types/document";
import {
  compareDocumentItems,
  filterDocumentItemsByName,
  getBreadcrumbItems,
  getDocumentItemsAtPath,
  normalizeForFilter,
  sortDocumentItems,
} from "./documents";

const items: DocumentItem[] = [
  { name: "Employee Handbook", type: "pdf", added: "2017-01-06" },
  { name: "Public Holiday policy", type: "pdf", added: "2016-12-06" },
  {
    name: "Expenses",
    type: "folder",
    files: [
      { name: "Expenses claim form", type: "doc", added: "2017-05-02" },
      {
        name: "Travel",
        type: "folder",
        files: [
          {
            name: "International travel policy",
            type: "pdf",
            added: "2017-06-01",
          },
        ],
      },
    ],
  },
  { name: "Cost centres", type: "csv", added: "2016-08-12" },
];

describe("getBreadcrumbItems", () => {
  it("returns Home for an empty folder path", () => {
    expect(getBreadcrumbItems([])).toEqual([{ label: "Home" }]);
  });

  it("returns Home followed by folder names", () => {
    expect(getBreadcrumbItems(["Expenses", "Travel"])).toEqual([
      { label: "Home" },
      { label: "Expenses" },
      { label: "Travel" },
    ]);
  });
});

describe("getDocumentItemsAtPath", () => {
  it("returns root items for an empty folder path", () => {
    expect(getDocumentItemsAtPath(items, [])).toEqual(items);
  });

  it("returns folder contents for a single-segment folder path", () => {
    expect(
      getDocumentItemsAtPath(items, ["Expenses"]).map((item) => item.name),
    ).toEqual(["Expenses claim form", "Travel"]);
  });

  it("returns nested folder contents", () => {
    expect(
      getDocumentItemsAtPath(items, ["Expenses", "Travel"]).map(
        (item) => item.name,
      ),
    ).toEqual(["International travel policy"]);
  });

  it("returns an empty array for an invalid folder path", () => {
    expect(getDocumentItemsAtPath(items, ["Missing"])).toEqual([]);
  });
});

describe("normalizeForFilter", () => {
  it("lowercases and removes whitespace", () => {
    expect(normalizeForFilter(" Hand  Book ")).toBe("handbook");
  });

  it("returns an empty string for whitespace-only input", () => {
    expect(normalizeForFilter("   ")).toBe("");
  });
});

describe("filterDocumentItemsByName", () => {
  it("returns all items when the filter is empty", () => {
    expect(filterDocumentItemsByName(items, "")).toEqual(items);
  });

  it("filters items by name", () => {
    expect(filterDocumentItemsByName(items, "handbook")).toEqual([items[0]]);
  });

  it("ignores whitespace in the filter value", () => {
    expect(filterDocumentItemsByName(items, "hand  book")).toEqual([items[0]]);
  });
});

describe("compareDocumentItems", () => {
  it("compares items by name", () => {
    expect(compareDocumentItems(items[0], items[3], "name")).toBeGreaterThan(0);
    expect(compareDocumentItems(items[3], items[0], "name")).toBeLessThan(0);
  });

  it("compares items by date and sorts folders after dated files", () => {
    expect(compareDocumentItems(items[3], items[1], "date")).toBeLessThan(0);
    expect(compareDocumentItems(items[2], items[0], "date")).toBeGreaterThan(0);
  });

  it("compares items by type", () => {
    expect(compareDocumentItems(items[3], items[0], "type")).toBeLessThan(0);
    expect(compareDocumentItems(items[2], items[0], "type")).toBeLessThan(0);
  });
});

describe("sortDocumentItems", () => {
  it("sorts items by name ascending", () => {
    expect(
      sortDocumentItems(items, "name", "asc").map((item) => item.name),
    ).toEqual([
      "Cost centres",
      "Employee Handbook",
      "Expenses",
      "Public Holiday policy",
    ]);
  });

  it("sorts items by name descending", () => {
    expect(
      sortDocumentItems(items, "name", "desc").map((item) => item.name),
    ).toEqual([
      "Public Holiday policy",
      "Expenses",
      "Employee Handbook",
      "Cost centres",
    ]);
  });

  it("sorts items by date ascending with folders last", () => {
    expect(
      sortDocumentItems(items, "date", "asc").map((item) => item.name),
    ).toEqual([
      "Cost centres",
      "Public Holiday policy",
      "Employee Handbook",
      "Expenses",
    ]);
  });

  it("does not mutate the original array", () => {
    const originalItems = [...items];

    sortDocumentItems(items, "name", "asc");

    expect(items).toEqual(originalItems);
  });
});
