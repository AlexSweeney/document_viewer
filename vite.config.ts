import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import type { IndexHtmlTransformContext, Plugin } from "vite";
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

const getEntryScriptUrl = (bundle: IndexHtmlTransformContext["bundle"]) => {
  if (!bundle) {
    return undefined;
  }

  const entryChunk = Object.values(bundle).find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry,
  );

  return entryChunk ? `/${entryChunk.fileName}` : undefined;
};

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

      const entryScriptUrl =
        ctx.bundle === undefined
          ? "/src/main.tsx"
          : getEntryScriptUrl(ctx.bundle);
      const scriptTagMatch = html.match(
        /<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/,
      );
      const scriptSrc = entryScriptUrl ?? scriptTagMatch?.[1];
      const scriptTag = scriptSrc
        ? `<script type="module" crossorigin src="${scriptSrc}"></script>`
        : "";
      const scriptPreload = scriptSrc
        ? `<link rel="preload" href="${scriptSrc}" as="script" crossorigin>`
        : "";
      const fontPreloads = faces
        .map(
          ({ url }) =>
            `<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin>`,
        )
        .join("\n    ");
      const style = `<style>${faces.map(({ weight, url }) => buildInlineFontFace(weight, url)).join("")}</style>`;
      const headTags = [scriptPreload, fontPreloads, style]
        .filter(Boolean)
        .join("\n    ");

      const withoutHeadScript = html.replace(
        /\s*<script type="module"[^>]*><\/script>/,
        "",
      );

      return withoutHeadScript
        .replace("</head>", `    ${headTags}\n  </head>`)
        .replace("</body>", `    ${scriptTag}\n  </body>`);
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
      "@mui/icons-material",
    ],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    passWithNoTests: true,
    exclude: ["node_modules", "dist", "e2e/**", "storybook-static/**"],
  },
});
