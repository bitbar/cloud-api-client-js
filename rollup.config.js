// Imports
import pluginCommonjs from 'rollup-plugin-commonjs';
import pluginTypeScript from '@rollup/plugin-typescript';
import pluginJson from '@rollup/plugin-json';
import pluginResolve from '@rollup/plugin-node-resolve';
import pluginUglify from 'rollup-plugin-uglify';

import $package from './package.json';

var externals = Object.keys($package.dependencies || []);
var globals = {};

for(let ext of externals) {
  globals[ext] = ext;
}


// Common
var config = {
  input: 'src/CloudAPIClient.ts',

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

  extensions: ['.js', '.ts'],

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
  pluginTypeScript(),
  pluginJson(),
  pluginResolve({
    extensions: config.extensions
  }),
  pluginCommonjs({
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
      pluginUglify.uglify({
        output: {
          comments: (node, comment) => {
            if (comment.type === "comment2") {
              // multiline comment
              return /LICENSE|\(c\)/.test(comment.value);
            }
            return false;
          }
        }
      })
    ]),
    external: external
  }
]
