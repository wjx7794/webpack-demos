const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: {
  //   index: {
  //     import: './src/index.js',
  //     dependOn: 'shared',
  //   },
  //   print: {
  //     import: './src/print.js',
  //     dependOn: 'shared',
  //   },
  //   another: {
  //     import: './src/another-module.js',
  //     dependOn: 'shared',
  //   },
  //   shared: 'lodash',
  // },
  entry: {
    index: './src/index.js',
    print: './src/print.js',
    another: './src/another-module.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  // optimization: {
  //   runtimeChunk: 'single',
  // },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 清理后再生成 dist
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '代码分离',
    }),
  ],
};
