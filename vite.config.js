import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',  // Важно для правильных путей
  build: {
    outDir: 'dist',  // По умолчанию dist, но можно указать явно
  },
});