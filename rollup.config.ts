import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

export default {
    input: `src/index.ts`,
    output: [
        {file: `${pkg.main}`, format: 'cjs', name: pkg.name, sourcemap: true},
        {file: `${pkg.module}`, format: 'es', name: pkg.name, sourcemap: true},
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    watch: {
        include: 'src/**',
    },
    plugins: [
        resolve(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        commonjs(),
        sourceMaps(),
    ],
};
