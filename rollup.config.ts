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
            name: 'collectCjsTypeDeclaration',
            writeBundle: {
                sequential: true,
                order: 'post',
                handler: ({ format }) => {
                    if (format !== 'cjs') {
                        return;
                    }

                    fs.readdir('./dist/es', { recursive: true }, (err, list) => {
                        for (const item of list) {
                            if (item.toString().endsWith('.js')) {
                                continue;
                            }

                            if (fs.lstatSync(`./dist/es/${item.toString()}`).isDirectory()) {
                                if (!fs.existsSync(`./dist/cjs/${item.toString()}`)) {
                                    fs.mkdirSync(`./dist/cjs/${item.toString()}`, { recursive: true });
                                }

                                continue;
                            }

                            fs.copyFile(`./dist/es/${item}`, `./dist/cjs/${item}`, (err) => {
                                if (err) {
                                    console.error(err);
                                }

                                fs.writeFile('./dist/cjs/package.json', '{\n\t"type": "commonjs"\n}', (err) => {
                                    if (err) {
                                        console.error(err);
                                    }
                                });
                            });
                        }
                    });
                },
            },
        }))(),
    ],
});
