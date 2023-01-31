import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: '/fgj-2023/',
    plugins: [eslint(), tsConfigPaths()],
});
