import fs from 'fs';

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
            name: 'patchCJjs',
            writeBundle: {
                sequential: true,
                order: 'post',
                handler: ({ format }) => {
                    if (format !== 'cjs') {
                        return;
                    }

                    fs.writeFile('./dist/cjs/index.d.ts', 'export * from \'../es/index\';\nexport { default } from \'../es/index\';', (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });

                    fs.writeFile('./dist/cjs/package.json', '{\n\t"type": "commonjs"\n}', (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                },
            },
        }))(),
    ],
});
