
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import visualizer from 'rollup-plugin-visualizer'

// ----------------------------------------------------------------------------

import pkg from './package.json'

// ----------------------------------------------------------------------------

const input = 'src/index.js'

// ----------------------------------------------------------------------------

export default [
  {
    input,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],

    plugins: [
      nodeResolve({
        preferBuiltins: true,
      }),
      commonjs(),
      babel({
        exclude: /node_modules/,
        babelHelpers: 'runtime',
      }),
      terser(),
      analyze({
        summaryOnly: true
      }),
      visualizer(),
    ],
  },
]
