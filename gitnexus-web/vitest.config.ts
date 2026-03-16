/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.{ts,tsx}'],
    testTimeout: 15000,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/workers/**',           // Web workers (require worker env)
        'src/core/lbug/**',         // WASM (requires SharedArrayBuffer)
        'src/core/tree-sitter/**',  // WASM (requires tree-sitter binaries)
        'src/core/embeddings/**',   // WASM (requires ML model)
        'src/main.tsx',             // Entry point
        'src/vite-env.d.ts',        // Type declarations
      ],
      thresholds: {
        statements: 10,
        branches: 10,
        functions: 10,
        lines: 10,
        autoUpdate: true,
      },
    },
  },
});
