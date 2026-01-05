import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  tsconfig: './tsconfig.json',
  external: ['react', 'react-dom', 'zod'],
  treeshake: true,
});

