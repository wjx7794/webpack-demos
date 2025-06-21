const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function (env, argv) {
  console.log('🌟 env =>', env);
  console.log('🍃 process.env.name =>', process.env.name);
  console.log('🍂 NODE_ENV =>', process.env.NODE_ENV);

  return {
    mode: env.prod ? 'production' : 'development',
    // 开启 sourceMap
    devtool: 'inline-source-map',
    // devServer 配置
    devServer: {
      // 告诉 dev server 应从什么位置开始查找文件
      static: {
        directory: path.join(__dirname, './dist'),
        // publicPath: ASSET_PATH,
      },
      port: 3000,
    },
    // 由于在这个示例中单个 HTML 页面有多个入口，所以添加了 optimization.runtimeChunk: 'single' 配置
    optimization: {
      runtimeChunk: 'single',
    },
    entry: {
      index: './src/index.js',
      print: './src/print.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '自定义',
      }),
    ],
  };
};
