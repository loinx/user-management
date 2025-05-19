import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/vite-env.d.ts',
        '**/*.d.ts',
        '**/*.config.ts',
        '**/types.ts',
        '**/index.ts',
        '**/store.ts',
        '**/main.tsx',
      ],
      include: ['src/**/*.{ts,tsx}'],
      all: true,
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}); 