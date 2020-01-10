import 'finka';
import pluginCommonjs from 'rollup-plugin-commonjs';
import pluginTypeScript from '@rollup/plugin-typescript';
import pluginJson from '@rollup/plugin-json';
import pluginUglify from 'rollup-plugin-uglify';

import $package from './package.json';

const external = Object.keys($package.dependencies || []);
const globals = {};

for(const ext of external) {
  globals[ext] = ext;
}

// Common
const config = {
  common: {
    input: 'src/index.ts',
    output: {
      file: 'dist/cloud-api-client.js',
      format: 'umd',
      name: 'cloud-api-client-js',
      banner: `/* Bitbar Cloud API Client for JavaScript v${$package.version} ` +
              '| (c) Bitbar Technologies and contributors ' +
              '| https://github.com/bitbar/cloud-api-client-js/blob/master/LICENSE.md ' +
              '*/',
      globals
    },
    external
  },

  uncompressed: undefined,
  compressed: undefined,

  extensions: ['.js', '.ts'],
};

const plugins = [
  pluginTypeScript(),
  pluginJson(),

  pluginCommonjs({
    extensions: config.extensions
  })
];

// Uncompressed
config.uncompressed = Object.deepAssign({
  output: {},
  plugins: plugins.clone()
}, config.common);

// Compressed
config.compressed = Object.deepAssign({
  output: {},
  plugins: plugins.clone()
}, config.common);
config.compressed.output.file = config.compressed.output.file.replace(/\.js$/, '.min.js');
config.compressed.plugins.push(
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
);

// Export
export default [
  config.uncompressed,
  config.compressed
];
