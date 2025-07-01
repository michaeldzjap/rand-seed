import { writeFile } from 'fs';

import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import clean from '@rollup-extras/plugin-clean';
import { defineConfig } from 'rollup';
import { dts } from 'rollup-plugin-dts';

const local = process.env.NODE_ENV === 'local';

export default [
    defineConfig({
        input: 'src/index.ts',
        output: [
            {
                dir: './dist',
                entryFileNames: 'cjs/index.js',
                format: 'cjs',
                sourcemap: local,
                exports: 'named',
            },
            {
                dir: './dist',
                entryFileNames: 'es/index.js',
                format: 'es',
                sourcemap: local,
            },
        ],
        watch: {
            include: 'src/**',
        },
        plugins: [
            clean('dist'),
            typescript({ sourceMap: local }),
            terser(),
            (() => ({
                name: 'createPackageFiles',
                writeBundle: {
                    sequential: true,
                    order: 'post',
                    handler: ({ format }) => {
                        switch (format) {
                            case 'cjs': {
                                writeFile('./dist/cjs/package.json', '{\n\t"type": "commonjs"\n}', (err) => {
                                    if (err) console.error(err);
                                });

                                break;
                            }
                            case 'es': {
                                writeFile('./dist/es/package.json', '{\n\t"type": "module"\n}', (err) => {
                                    if (err) console.error(err);
                                });

                                break;
                            }
                        }
                    },
                },
            }))(),
        ],
    }),
    defineConfig({
        input: './dist/types/index.d.ts',
        output: [
            {
                file: 'dist/index.d.ts',
                format: 'cjs',
            },
            {
                file: 'dist/index.d.mts',
                format: 'es',
            },
        ],
        plugins: [dts(), clean('dist/types')],
    }),
];
