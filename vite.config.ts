import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

const latinFontFiles = [
  "roboto-latin-400-normal.woff2",
  "roboto-latin-500-normal.woff2",
  "roboto-latin-700-normal.woff2",
] as const;

const preloadLatinFonts = (): Plugin => ({
  name: "preload-latin-fonts",
  transformIndexHtml: {
    order: "post",
    handler(html, ctx) {
      const preloads =
        ctx.bundle === undefined
          ? latinFontFiles.map(
              (file) =>
                `<link rel="preload" href="/node_modules/@fontsource/roboto/files/${file}" as="font" type="font/woff2" crossorigin>`,
            )
          : Object.values(ctx.bundle)
              .filter(
                (chunk) =>
                  chunk.type === "asset" &&
                  chunk.fileName.endsWith(".woff2") &&
                  chunk.fileName.includes("latin") &&
                  !chunk.fileName.includes("italic"),
              )
              .map(
                (chunk) =>
                  `<link rel="preload" href="/${chunk.fileName}" as="font" type="font/woff2" crossorigin>`,
              );

      if (preloads.length === 0) {
        return html;
      }

      return html.replace(
        "</head>",
        `    ${preloads.join("\n    ")}\n  </head>`,
      );
    },
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadLatinFonts()],
  optimizeDeps: {
    include: [
      "@mui/material/TextField",
      "@mui/material/MenuItem",
      "@mui/material/CircularProgress",
      "@mui/material/CssBaseline",
      "@mui/material/styles",
      "@mui/material/Typography",
      "@mui/material/ButtonBase",
      "@mui/material/Breadcrumbs",
      "@mui/material/IconButton",
      "@mui/material/SvgIcon",
      "@mui/icons-material/ArrowDownward",
      "@mui/icons-material/ArrowUpward",
      "@mui/icons-material/ChevronLeft",
      "@mui/icons-material/ChevronRight",
      "@mui/icons-material/DarkMode",
      "@mui/icons-material/Description",
      "@mui/icons-material/Folder",
      "@mui/icons-material/LightMode",
      "@mui/icons-material/Movie",
      "@mui/icons-material/PictureAsPdf",
      "@mui/icons-material/TableChart",
      "@mui/icons-material/TableView",
    ],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    passWithNoTests: true,
    exclude: ["node_modules", "dist", "e2e/**", "storybook-static/**"],
  },
});
