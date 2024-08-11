import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import clean from '@rollup-extras/plugin-clean';
import { defineConfig } from 'rollup';

const local = process.env.NODE_ENV === 'local';

export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            dir: './dist',
            entryFileNames: 'index.cjs',
            format: 'cjs',
            sourcemap: local,
            exports: 'named',
        },
        {
            dir: './dist',
            entryFileNames: 'index.js',
            format: 'es',
            sourcemap: local,
        },
    ],
    watch: {
        include: 'src/**',
    },
    plugins: [clean('dist'), typescript({ sourceMap: local }), terser()],
});
