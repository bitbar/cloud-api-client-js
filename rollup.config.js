'use strict';

import commonjs from '@rollup/plugin-commonjs';
import pluginTypeScript from 'rollup-plugin-typescript2';
import pluginJson from '@rollup/plugin-json';
import {babel} from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import pluginDelete from 'rollup-plugin-delete';

import $package from './package.json' with {type: 'json'};

const input = 'src/index.ts';
const external = Object.keys($package.dependencies || []).concat(['fs']);
const globals = {};
const extensions = ['.js', '.ts'];

let repo = $package.repository.url;
repo = repo.substr(repo.length - 4);

for(const ext of external) {
  globals[ext] = ext;
}

const safeName = $package.name.replace(/@/g, '').replace(/\//g, '-');

function getOutput(min, sufix = '') {
  return {
    file: `dist/${safeName}${sufix}${(min ? '.min' : '')}.js`,
    format: 'umd',
    name: safeName,
    banner: `/* ${$package.name} v${$package.version} ` +
    `| Copyright ${new Date().getFullYear()} (c) SmartBear Software and contributors ` +
    `| ${repo}/blob/master/LICENSE ` +
    '*/',
    globals,
    sourcemap: true
  };
}

function getDeletePlugin() {
  return pluginDelete({
    targets: 'dist/*',
    runOnce: true
  });
}

function getTS() {
  return pluginTypeScript({
    useTsconfigDeclarationDir: false
  });
}

function getBabel() {
  return babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ]
  });
}

function getPluginCJS() {
  return commonjs({
    extensions,
    include: 'node_modules/**'
  });
}


export default [
  // Uncompressed config
  {
    input,
    output: getOutput(),
    plugins: [
      getDeletePlugin(),
      getTS(),
      getBabel(),
      pluginJson(),
      getPluginCJS()
    ],
    external
  },

  // Compressed config
  {
    input,
    output: getOutput(true),
    plugins: [
      getTS(),
      getBabel(),
      pluginJson(),
      getPluginCJS(),
      terser({
        output: {
          comments: (node, comment) => {
            if (comment.type === 'comment2') {
              // multiline comment
              return /LICENSE|\(c\)/.test(comment.value);
            }
            return false;
          }
        }
      })
    ],
    external
  }
];
