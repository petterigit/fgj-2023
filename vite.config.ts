import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    base: '/fgj-2023/',
    plugins: [eslint()],
});
