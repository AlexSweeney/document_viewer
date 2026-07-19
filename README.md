# Document Viewer

A single-page React application for browsing documents and folders uploaded by an administrator. Built as a technical task for BrightHR. See the [project plan] here (https://docs.google.com/document/d/1OKY2SFIzzr9dyd--mtm8aq_5n4TQGqCQKV5m3umkMu0/edit?tab=t.0).

The UI is inspired by macOS folder navigation: a breadcrumb trail, back/forward controls, and a main panel listing the current folder's contents.

It works with nested folders, and assumes that no two sibling folders will have identical names.

## Features

### Task requirements

- **Document list** — displays files and folders from mock data
- **File details** — each file shows file type, name, and date added
- **Folders** — shown with a folder icon and type label; clickable to open
- **Folder navigation** — open a folder to view its contents
- **Sort** — sort by name, date created, or file type; toggle ascending/descending
- **Filter** — filter the current view by filename (case-insensitive, ignores spaces)

### Additional work

- **Breadcrumbs** — navigate to Home or any ancestor folder
- **Back / forward** — browser-style history through visited folders
- **Loading and error states** — simulated async fetch with TanStack Query
- **Dark / light theme** — toggle in the header
- **Responsive layout** — header and document panel adapt to smaller viewports
- **Accessibility** — semantic markup, keyboard-focusable controls, and axe checks in unit tests
- **Storybook** — isolated stories for components
- **Component and integration tests** — Vitest, React Testing Library, and snapshot tests

### Out of scope (by design)

Clicking a **file** does not open a document viewer. In a production app this would navigate to a dedicated document view with appropriate rendering per file type (PDF viewer, video player, etc.).

## Tech stack

| Area                              | Choice                                      |
| --------------------------------- | ------------------------------------------- |
| Framework                         | React 19 + TypeScript                       |
| Build tool                        | Vite                                        |
| UI                                | MUI (Material UI)                           |
| Server state                      | TanStack Query                              |
| Unit / component tests            | Vitest + React Testing Library + vitest-axe |
| E2E (configured, not implemented) | Playwright                                  |
| Component docs                    | Storybook                                   |
| Linting / formatting              | ESLint + Prettier                           |
| Git hooks                         | Husky + lint-staged                         |

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm (included with Node)

## Getting started

```bash
# Clone the repository
git clone <your-repo-url>
cd document-viewer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production build

```bash
npm run build
npm run preview
```

The preview server runs at [http://localhost:4173](http://localhost:4173).

## Running tests

### Unit and component tests

```bash
# Run all tests once
npm test

# Run in watch mode
npx vitest
```

Tests live alongside components under `src/` and cover:

- Pure utility functions (`src/utils/documents.test.ts`)
- Atoms, molecules, and organisms
- App-level integration (filtering, sorting, folder navigation, breadcrumbs)
- Accessibility audits via `vitest-axe` (`src/App/a11y.test.tsx`)

### End-to-end tests

Playwright is installed and configured (`playwright.config.ts`), but **no E2E specs have been written yet**. The `e2e/` directory is a placeholder.

When implemented, you would run:

```bash
# Install browser binaries (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e
```

### Linting and formatting

```bash
npm run lint
npm run format:check
npm run format
```

Pre-commit hooks (via Husky) run ESLint and Prettier on staged files automatically.

## Storybook

Browse components in isolation:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006).

Build a static Storybook:

```bash
npm run build-storybook
```

## Other scripts

| Script                     | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| `npm run audit:lighthouse` | Build the app and run a Lighthouse audit (requires Chrome)        |
| `npm run audit:a11y`       | Placeholder for Playwright + axe E2E audit (spec not yet written) |

## Project structure

```
src/
├── api/              # Mock async document fetch
├── App/              # Root application component and tests
├── components/
│   ├── atoms/        # BreadCrumb, Icon, TextField, SelectField, etc.
│   ├── molecules/    # BreadCrumbs, DocumentItem
│   └── organisms/    # Header, DocumentPanel
├── hooks/            # TanStack Query hooks
├── mock-data/        # Static document tree
├── theme/            # MUI theme and light/dark mode
├── types/            # TypeScript types for documents
├── utils/            # Sorting, filtering, and navigation helpers
└── test/             # Shared test utilities and axe setup
```

## Data model

Documents are a recursive tree of files and folders. Types are defined in `src/types/document.ts`. Mock data in `src/mock-data/documents.ts` extends the task's example with nested folders (e.g. `Expenses → Travel → 2024`) to exercise deeper navigation.

Folder lookup is by **name within the current level**. The solution assumes folder names are unique among siblings at each level.

## Architecture notes

- **Container / presentation split** — `App` owns navigation, sort, and filter state; presentational components receive props and callbacks
- **TanStack Query** — `fetchDocuments` simulates a 1 s API delay and caches the result, demonstrating how server state would be handled against a real backend
- **Navigation history** — a stack of visited folder paths powers back, forward, and breadcrumb jumps; opening a new folder clears any forward history
- **Atomic design** — components are grouped as atoms → molecules → organisms, with Storybook stories and unit tests at each level

## Git history

Commits are kept small and incremental so the development process is visible — from project setup and component building through functionality, responsiveness, and test refactors. Review the log with:

```bash
git log --oneline
```

## If I had more time

These items were deliberately left out or only partially addressed:

| Item                        | Approach                                                                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **E2E tests**               | Write Playwright specs for critical user flows: load documents, open a nested folder, filter, sort, navigate with breadcrumbs and back/forward |
| **Breadcrumb truncation**   | Collapse middle segments to an ellipsis on narrow screens, keeping Home and the current folder visible                                         |
| **Unique folder identity**  | Replace name-based paths with stable IDs to support duplicate folder names and reliable deep linking                                           |
| **Test coverage reporting** | Add `@vitest/coverage-v8` and a CI threshold for utils and interaction logic                                                                   |
| **Decouple from MUI**       | Explore how to reduce coupling between components and MUI so a different styling library could be adopted easily                               |
| **Mobile polish**           | The layout is responsive, but on mobile the header controls would overflow; add dedicated mobile components and layouts                        |
| **Cursor / editor rules**   | Add project rules (e.g. no type casting, consistent import patterns) to keep AI-assisted edits aligned with conventions                        |
