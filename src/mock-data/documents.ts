import type { DocumentItem } from "../types/document";

export const mockDocuments: DocumentItem[] = [
  {
    type: "pdf",
    name: "Employee Handbook",
    added: "2017-01-06",
  },
  {
    type: "pdf",
    name: "Public Holiday policy",
    added: "2016-12-06",
  },
  {
    type: "folder",
    name: "Expenses",
    files: [
      {
        type: "doc",
        name: "Expenses claim form",
        added: "2017-05-02",
      },
      {
        type: "doc",
        name: "Fuel allowances",
        added: "2017-05-03",
      },
      {
        type: "folder",
        name: "Travel",
        files: [
          {
            type: "pdf",
            name: "International travel policy",
            added: "2017-06-01",
          },
          {
            type: "xlsx",
            name: "Mileage log template",
            added: "2017-06-02",
          },
          {
            type: "folder",
            name: "2024",
            files: [
              {
                type: "csv",
                name: "Q1 travel claims",
                added: "2024-04-01",
              },
              {
                type: "csv",
                name: "Q2 travel claims",
                added: "2024-07-01",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "csv",
    name: "Cost centres",
    added: "2016-08-12",
  },
  {
    type: "folder",
    name: "Misc",
    files: [
      {
        type: "doc",
        name: "Christmas party",
        added: "2017-12-02",
      },
      {
        type: "mov",
        name: "Welcome to the company!",
        added: "2015-04-24",
      },
      {
        type: "folder",
        name: "Archive",
        files: [
          {
            type: "folder",
            name: "Legacy policies",
            files: [
              {
                type: "pdf",
                name: "Dress code 2014",
                added: "2014-03-10",
              },
              {
                type: "pdf",
                name: "Remote working policy 2015",
                added: "2015-09-18",
              },
            ],
          },
          {
            type: "folder",
            name: "Events",
            files: [
              {
                type: "doc",
                name: "Summer social 2016",
                added: "2016-07-14",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "HR",
    files: [
      {
        type: "folder",
        name: "Policies",
        files: [
          {
            type: "pdf",
            name: "Parental leave policy",
            added: "2018-02-01",
          },
          {
            type: "pdf",
            name: "Sickness absence policy",
            added: "2018-02-15",
          },
        ],
      },
      {
        type: "folder",
        name: "Onboarding",
        files: [
          {
            type: "pdf",
            name: "New starter checklist",
            added: "2019-01-10",
          },
          {
            type: "mov",
            name: "Office tour",
            added: "2019-01-10",
          },
        ],
      },
    ],
  },
];
