const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// 尝试使用环境变量，否则使用根路径
const ASSET_PATH = process.env.ASSET_PATH || '/all';

module.exports = {
  mode: 'development',
  // 开启 sourceMap
  devtool: 'inline-source-map',

  devServer: {
    // 告诉 dev server 应从什么位置开始查找文件
    static: {
      directory: path.join(__dirname, './dist'),
      publicPath: ASSET_PATH,
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
    // 这里也要设置
    publicPath: ASSET_PATH,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 清理后再生成 dist
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '公共路径',
    }),
    // 这可以帮助我们在代码中安全地使用环境变量
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
  ],
};
