const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const nodecg = require('./util/nodecg-api-context').get();

const dashJsPath = `${path.resolve(__dirname)}/dashboard/`;
const nodeModulesPath = `${path.resolve(__dirname)}/node_modules`;
const bowerModulesPath = `${path.resolve(__dirname)}/node_modules/@bower_components`;

module.exports = [
  {
    entry: `${dashJsPath}src/toaster-config.js`,
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    output: {
      path: `${dashJsPath}dist`,
      filename: 'toaster-config.bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${dashJsPath}src/dashboard.ejs`,
        filename: `${dashJsPath}toaster-config.html`,
      }),
      new VueLoaderPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    resolveLoader: {
      modules: [nodeModulesPath, bowerModulesPath],
    },
  },
];
