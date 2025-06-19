const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// 尝试使用环境变量，否则使用根路径
const ASSET_PATH = process.env.ASSET_PATH || '/all/';

module.exports = {
  mode: 'development',
  // 开启 sourceMap
  devtool: 'inline-source-map',
  // devServer 配置
  devServer: {
    // 告诉 dev server 应从什么位置开始查找文件
    static: {
      directory: path.join(__dirname, './dist'),
      publicPath: '/new/',
    },
    port: 3000,
  },
  // 由于在这个示例中单个 HTML 页面有多个入口，所以添加了 optimization.runtimeChunk: 'single' 配置
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '资源模块',
      // publicPath: '/new/', // 显式传递变量到 HTML（需与 __webpack_public_path__ 一致）
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
  ],
};
