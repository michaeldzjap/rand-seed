import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const pkg = require('./package.json');
const local = process.env.NODE_ENV === 'local';

export default {
    input: 'src/index.ts',
    output: [
        { dir: './', entryFileNames: pkg.main, format: 'cjs', sourcemap: local, exports: 'named' },
        { dir: './', entryFileNames: pkg.module, format: 'es', sourcemap: local },
    ],
    watch: {
        include: 'src/**',
    },
    plugins: [
        typescript({
            sourceMap: local,
        }),
        commonjs(),
        nodeResolve(),
        terser(),
    ],
};
