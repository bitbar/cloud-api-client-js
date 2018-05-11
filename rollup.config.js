import commonjs from 'rollup-plugin-commonjs';
import coffee from 'rollup-plugin-coffee-script';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/Main.coffee',

  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'testdroid-js-api-client'
  },

  plugins: [
    coffee(),
    nodeResolve({
      extensions: ['.js', '.coffee']
    }),
    commonjs({
      extensions: ['.js', '.coffee']
    })
  ]
}
