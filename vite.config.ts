import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        testcard: resolve(__dirname, "testcard.html"),
      },
    },
  },
});
