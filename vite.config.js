// C:\Users\Asus\OneDrive\Desktop\New folder\music-library-app\vite.config.js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// REMOVE THIS IMPORT: import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: "http://localhost:5174/",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: true, // Keep this true, as it's intended to extract CSS
    lib: {
      // CHANGE THIS BACK: Use a single string entry point
      entry: "src/main.jsx",
      name: "MusicLibraryApp",
      // CHANGE THIS BACK: Use the simpler fileName function for a single entry
      fileName: (format) => `music-library-app.${format}.js`,
      formats: ["umd"],
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.fileName === "style.css") {
            return "music-library-app.css";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  server: {
    port: 5174,
  },
});
