import path from 'path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';
import react from '@vitejs/plugin-react';
import external from '@yelo/rollup-node-external';

const ignore = ['src/**/*.d.{ts,tsx}', 'src/**/*.stories.{ts,tsx}', 'src/**/*.stories.d.{ts,tsx}'];

export default defineConfig({
    css: {
        // @ts-ignore
        modules: true,
    },
    build: {
        copyPublicDir: false,
        outDir: './lib',
        target: 'esnext',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: external(),
            input: Object.fromEntries(
                glob
                    .sync('src/**/*.{ts,tsx}', { ignore })
                    .map((file) => [
                        path.relative('src', file.slice(0, file.length - path.extname(file).length)),
                        fileURLToPath(new URL(file, import.meta.url)),
                    ]),
            ),
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
                globals: {
                    react: 'React',
                },
            },
            plugins: [
                react({
                    babel: {
                        plugins: [],
                    },
                }),
                dts({ include: ['src'] }),
            ],
        },
        minify: true,
    },
});
