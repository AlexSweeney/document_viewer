import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

const latinFontFiles = [
  { weight: 400, file: "roboto-latin-400-normal.woff2" },
  { weight: 500, file: "roboto-latin-500-normal.woff2" },
  { weight: 700, file: "roboto-latin-700-normal.woff2" },
] as const;

const robotoFontSourceDir = path.resolve(
  "node_modules/@fontsource/roboto/files",
);

const buildInlineFontFace = (weight: number, url: string) =>
  `@font-face{font-family:'Roboto';font-style:normal;font-display:swap;font-weight:${weight};src:url('${url}') format('woff2')}`;

const inlineRobotoFonts = (): Plugin => ({
  name: "inline-roboto-fonts",
  generateBundle() {
    for (const { file } of latinFontFiles) {
      this.emitFile({
        type: "asset",
        name: file,
        source: fs.readFileSync(path.join(robotoFontSourceDir, file)),
      });
    }
  },
  transformIndexHtml: {
    order: "post",
    handler(html, ctx) {
      const faces =
        ctx.bundle === undefined
          ? latinFontFiles.map(({ weight, file }) => ({
              weight,
              url: `/node_modules/@fontsource/roboto/files/${file}`,
            }))
          : Object.values(ctx.bundle)
              .filter(
                (chunk) =>
                  chunk.type === "asset" &&
                  chunk.fileName.endsWith(".woff2") &&
                  chunk.fileName.includes("latin") &&
                  !chunk.fileName.includes("italic"),
              )
              .flatMap((chunk) => {
                const match = chunk.fileName.match(/latin-(\d+)-normal/);
                if (!match) {
                  return [];
                }

                return [
                  {
                    weight: Number(match[1]),
                    url: `/${chunk.fileName}`,
                  },
                ];
              })
              .sort((a, b) => a.weight - b.weight);

      if (faces.length === 0) {
        return html;
      }

      const preloads = faces
        .map(
          ({ url }) =>
            `<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin>`,
        )
        .join("\n    ");
      const style = `<style>${faces.map(({ weight, url }) => buildInlineFontFace(weight, url)).join("")}</style>`;

      return html.replace(
        "</head>",
        `    ${preloads}\n    ${style}\n  </head>`,
      );
    },
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineRobotoFonts()],
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
