import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this repo at /ParkerSmithPortfolio/. With a custom domain, build with BASE_PATH=/.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/ParkerSmithPortfolio/",
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["motion/react"],
        },
      },
    },
  },
});
