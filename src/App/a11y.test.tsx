import { waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { ThemeModeToggle } from "../components/atoms/ThemeModeToggle";
import { DocumentItem } from "../components/molecules/DocumentItem";
import { DocumentPanel } from "../components/organisms/DocumentPanel";
import { Header } from "../components/organisms/Header";
import type { ThemeMode } from "../theme/colors";
import { expectNoA11yViolations } from "../test/a11yUtils";
import { cleanup, render, screen } from "../test/testUtils";

afterEach(() => {
  cleanup();
});

const breadCrumbItems = [
  { label: "Home" },
  { label: "Expenses" },
  { label: "Travel" },
];

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date created" },
  { value: "type", label: "File type" },
] as const;

const panelItems = [
  {
    name: "Employee Handbook",
    type: "pdf" as const,
    added: "2017-01-06",
  },
  { name: "Documents", type: "folder" as const, files: [] },
];

const themeModeToggleLabel: Record<ThemeMode, string> = {
  light: "Switch to dark mode",
  dark: "Switch to light mode",
};

const renderApp = (themeMode: ThemeMode) => render(<App />, { themeMode });

const renderHeader = (themeMode: ThemeMode) =>
  render(
    <Header
      breadCrumbItems={breadCrumbItems}
      onClickBreadCrumb={vi.fn()}
      title="Document viewer"
    />,
    { themeMode },
  );

const renderDocumentPanel = (themeMode: ThemeMode) =>
  render(
    <DocumentPanel sortOptions={sortOptions}>
      {panelItems.map((item, index) => {
        const key = `${item.name}-${index}`;

        return <DocumentItem key={key} item={item} />;
      })}
    </DocumentPanel>,
    { themeMode },
  );

const renderDocumentItem = (themeMode: ThemeMode) =>
  render(
    <DocumentItem
      item={{
        name: "Employee Handbook",
        type: "pdf",
        added: "2017-01-06",
      }}
    />,
    { themeMode },
  );

const renderThemeModeToggle = (themeMode: ThemeMode) =>
  render(<ThemeModeToggle />, { themeMode });

const waitForAppToLoad = async () => {
  await waitFor(
    () => {
      expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
};

describe("accessibility", () => {
  describe("light mode", () => {
    it("App has no accessibility violations", async () => {
      const { container } = renderApp("light");

      await waitForAppToLoad();
      await expectNoA11yViolations(container);
    });

    it("Header has no accessibility violations", async () => {
      const { container } = renderHeader("light");

      await expectNoA11yViolations(container);
    });

    it("DocumentPanel has no accessibility violations", async () => {
      const { container } = renderDocumentPanel("light");

      await expectNoA11yViolations(container);
    });

    it("DocumentItem has no accessibility violations", async () => {
      const { container } = renderDocumentItem("light");

      await expectNoA11yViolations(container);
    });

    it("ThemeModeToggle has no accessibility violations", async () => {
      const { container } = renderThemeModeToggle("light");

      const themeModeToggle = screen.getByRole("button", {
        name: themeModeToggleLabel.light,
      });
      expect(themeModeToggle).toBeInTheDocument();
      await expectNoA11yViolations(container);
    });
  });

  describe("dark mode", () => {
    it("App has no accessibility violations", async () => {
      const { container } = renderApp("dark");

      await waitForAppToLoad();
      await expectNoA11yViolations(container);
    });

    it("Header has no accessibility violations", async () => {
      const { container } = renderHeader("dark");

      await expectNoA11yViolations(container);
    });

    it("DocumentPanel has no accessibility violations", async () => {
      const { container } = renderDocumentPanel("dark");

      await expectNoA11yViolations(container);
    });

    it("DocumentItem has no accessibility violations", async () => {
      const { container } = renderDocumentItem("dark");

      await expectNoA11yViolations(container);
    });

    it("ThemeModeToggle has no accessibility violations", async () => {
      const { container } = renderThemeModeToggle("dark");

      const themeModeToggle = screen.getByRole("button", {
        name: themeModeToggleLabel.dark,
      });
      expect(themeModeToggle).toBeInTheDocument();
      await expectNoA11yViolations(container);
    });
  });
});
