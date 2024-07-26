import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["parquet-wasm/esm/arrow2"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "petaresikopenyakit.dev/src"),
    },
  },
});
