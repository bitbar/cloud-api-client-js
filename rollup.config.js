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
  input: 'src/TestdroidCloudAPIClient.coffee',

  output: {
    file: 'dist/testdroid-api-client',
    format: 'umd',
    name: 'testdroid-api-client-js',
    banner: '/* Testdroid Cloud API Client for JavaScript v'
          + $package.version
          + ' | (c) Marek Sierociński and other contributors'
          + ' | https://github.com/marverix/testdroid-api-client-js/blob/master/LICENSE.md */',
    globals: globals
  },

  extensions: ['.js', '.coffee'],

  external: externals
};

// Export
export default [
  // Uncompressed config
  {
    input: config.input,
  
    output: {
      file: config.output.file + '.js',
      format: config.output.format,
      name:  config.output.name,
      banner: config.output.banner,
      globals: config.output.globals
    },
  
    plugins: [
      coffee(),
      json(),
      nodeResolve({
        extensions: config.extensions
      }),
      commonjs({
        extensions: config.extensions
      })
    ],

    external: config.external
  },

  // Compressed config
  {
    input: config.input,
  
    output: {
      file: config.output.file + '.min.js',
      format: config.output.format,
      name:  config.output.name,
      banner: config.output.banner,
      globals: config.output.globals
    },
  
    plugins: [
      coffee(),
      json(),
      nodeResolve({
        extensions: config.extensions
      }),
      commonjs({
        extensions: config.extensions
      }),
      uglify({
        output: {
          comments: 'all'
        }
      })
    ],

    external: config.external
  }
]
