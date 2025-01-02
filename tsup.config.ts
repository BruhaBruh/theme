import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/cli.ts', 'src/index.ts'],
    outDir: 'dist',
    format: ['esm'],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: false,
    outExtension: () => ({ js: '.mjs' }),
  },
]);
