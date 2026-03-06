import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// ESM-compatible fork (original uses require() and breaks with "type": "module")
// Install: npm i -D vite-plugin-prerender-esm-fix @prerenderer/renderer-puppeteer
import vitePrerender from "vite-plugin-prerender-esm-fix";

const PRERENDER_ROUTES = [
  "/",
  "/plans",
  "/team",
  "/testimonials",
  "/success-stories",
  "/book-call",
  "/resume-review",
  "/resume-rebuild",
];

export default defineConfig({
  server: { host: "::", port: 3001 },
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, "dist"),
      routes: PRERENDER_ROUTES,
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "radix-vendor": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
          ],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "ui-vendor": ["framer-motion", "lottie-react"],
        },
      },
    },
  },
});
