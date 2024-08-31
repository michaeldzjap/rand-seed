import { copyFile, lstat, readdir, writeFile } from 'fs';
import { dirname, parse } from 'path';

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
            name: 'copyDeclarationFiles',
            writeBundle: {
                sequential: true,
                order: 'post',
                handler: ({ format }) => {
                    if (format === 'cjs') return;

                    readdir('./dist/types', { recursive: true }, (err, paths) => {
                        if (err) return console.error(err);

                        for (const path of paths) {
                            lstat(`./dist/types/${path}`, (err, stats) => {
                                if (err) return console.error(err);

                                if (stats.isFile()) {
                                    const dir = dirname(path.toString()).replace(/^\./, '');

                                    copyFile(
                                        `./dist/types/${path}`,
                                        `./dist/types/${dir ? `${dir}/` : dir}${parse(path.toString()).name}.mts`,
                                        (err) => {
                                            if (err) return console.error(err);
                                        },
                                    );
                                }
                            });
                        }
                    });
                },
            }
        }))(),
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
});
