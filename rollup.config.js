// Imports
import commonjs from 'rollup-plugin-commonjs';
import coffee from 'rollup-plugin-coffee-script';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

import $package from './package.json';

var externals = Object.keys($package.dependencies || []);
var globals = {};

for(let ext of externals) {
  globals[ext] = ext;
}


// Common
var config = {
  input: 'src/CloudAPIClient.coffee',

  output: {
    file: 'dist/cloud-api-client',
    format: 'umd',
    name: 'cloud-api-client-js',
    banner: `/* Bitbar Cloud API Client for JavaScript v${$package.version} ` +
            '| (c) Bitbar Technologies and contributors ' +
            '| https://github.com/bitbar/cloud-api-client-js/blob/master/LICENSE.md ' +
            '*/',
    globals: globals
  },

  extensions: ['.js', '.coffee'],

  external: externals
};

var input = config.input;

var output = function(min) {
  return {
    file: config.output.file + (min ? '.min' : '') + '.js',
    format: config.output.format,
    name:  config.output.name,
    banner: config.output.banner,
    globals: config.output.globals
  };
};

var plugins = [
  coffee(),
  json(),
  nodeResolve({
    extensions: config.extensions
  }),
  commonjs({
    extensions: config.extensions
  })
];

var external = config.external;

// Export
export default [
  // Uncompressed config
  {
    input: input,
    output: output(),
    plugins: plugins,
    external: external
  },

  // Compressed config
  {
    input: input,
    output: output(true),
    plugins: plugins.concat([
      uglify({
        output: {
          comments: 'all'
        }
      })
    ]),
    external: external
  }
]
