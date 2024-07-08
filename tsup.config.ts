import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    outExtension: (ctx) => {
      if (ctx.format === 'esm') return { js: '.mjs' };
      return { js: '.cjs' };
    },
  },
  {
    entry: ['src/cli.ts'],
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
