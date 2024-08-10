import { readFile } from 'fs/promises';

import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';

const pkg = JSON.parse((await readFile(new URL('./package.json', import.meta.url))).toString());
const local = process.env.NODE_ENV === 'local';

export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            dir: './',
            entryFileNames: pkg.main,
            format: 'cjs',
            sourcemap: local,
            exports: 'named',
        },
        {
            dir: './',
            entryFileNames: pkg.module,
            format: 'es',
            sourcemap: local,
        },
    ],
    watch: {
        include: 'src/**',
    },
    plugins: [typescript({ sourceMap: local }), terser()],
});
