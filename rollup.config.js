import commonjs from '@rollup/plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

const base = {
    input: 'src/index.ts',
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    watch: {
        include: 'src/**',
    },
    plugins: [
        eslint(),
        typescript({
            typescript: require('typescript'),
            clean: true,
        }),
        commonjs(),
        nodeResolve(),
        sourceMaps(),
    ],
};

export default [
    {
        ...base,
        ...{
            output: { file: pkg.main, format: 'cjs', sourcemap: true, exports: 'named' },
            plugins: [...base.plugins, uglify()],
        },
    },
    {
        ...base,
        ...{
            output: { file: pkg.module, format: 'es', sourcemap: true },
            plugins: [...base.plugins, terser()],
        },
    },
];
