import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    base: '/fgj-2023/',
    build: {
        chunkSizeWarningLimit: 1000,
    },
    plugins: [eslint()],
});
