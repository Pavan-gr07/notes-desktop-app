import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    // Point Vite to the folder containing index.html
    root: path.resolve(__dirname, 'src/renderer'),
    base: './',
    plugins: [react(), tailwindcss()],
    build: {
        // Since root is now src/renderer, we must go UP to reach the project dist
        outDir: path.resolve(__dirname, 'dist/renderer'),
        emptyOutDir: true
    }
});