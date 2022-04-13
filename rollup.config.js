// @ts-check
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
// import vuePlugin from 'rollup-plugin-vue';
// import styles from 'rollup-plugin-styles';
import esbuild from 'rollup-plugin-esbuild';
// import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
// import analyzer from 'rollup-plugin-analyzer';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import multiInput from 'rollup-plugin-multi-input';
import nodeResolve from '@rollup/plugin-node-resolve';
// import staticImport from 'rollup-plugin-static-import';
// import ignoreImport from 'rollup-plugin-ignore-import';

import pkg from './package.json';

console.log(DEFAULT_EXTENSIONS);

const externalDeps = Object.keys(pkg.dependencies || {}).concat([/lodash/, /@babel\/runtime/]);
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});

const input = 'src/index.ts';
const inputList = ['src/**/*.ts', 'src/**/*.tsx', '!src/**/demos', '!src/**/*.d.ts', '!src/**/__tests__'];

const getPlugins = ({ isProd = false, ignoreLess = true, extractOneCss = false, extractMultiCss = false } = {}) => {
  const plugins = [
    nodeResolve(),
    commonjs(),
    // vuePlugin(),
    esbuild({
      target: 'esnext',
      minify: false,
      jsx: 'preserve',
      tsconfig: 'tsconfig.json',
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    json(),
    url(),
    replace({
      preventAssignment: true,
      values: {
        __VERSION__: JSON.stringify(pkg.version),
      },
    }),
  ];

  // if (env) {
  //   plugins.push(
  //     replace({
  //       preventAssignment: true,
  //       values: {
  //         'process.env.NODE_ENV': JSON.stringify(env),
  //       },
  //     }),
  //   );
  // }

  if (isProd) {
    plugins.push(
      terser({
        output: {
          /* eslint-disable */
          ascii_only: true,
          /* eslint-enable */
        },
      }),
    );
  }

  return plugins;
};

/** @type {import('rollup').RollupOptions} */
const esConfig = {
  input: inputList,
  // .concat('!src/index.ts'),
  treeshake: false,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins({ extractMultiCss: true })),
  output: {
    dir: 'es/',
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

export default [esConfig];
