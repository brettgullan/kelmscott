
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
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
      peerDepsExternal(),
      nodeResolve({
        preferBuiltins: true,
      }),
      babel({
        exclude: /node_modules/,
        babelHelpers: 'runtime',
      }),
      commonjs(), // babel before commonjs else SyntaxError
      terser(),
      analyze({
        summaryOnly: true
      }),
      visualizer(),
    ],
  },
]
