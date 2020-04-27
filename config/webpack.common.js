const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  loadJavaScript,
  loadSvg,
} = require('./webpack.parts');

module.exports = (mode) =>
  merge([
    {
      entry: './src/index.tsx',
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Webpack demo',
          template: 'web/index.html',
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
        }),
      ],
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    },
    loadSvg(),
    loadJavaScript({
      ...(mode === 'production' ? { exclude: /node_modules/ } : {}),
    }),
  ]);
