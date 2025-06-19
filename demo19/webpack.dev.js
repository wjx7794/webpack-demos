const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// 尝试使用环境变量，否则使用根路径
const ASSET_PATH = process.env.ASSET_PATH || '/all/';

module.exports = merge(common, {
  // 入口
  entry: {
    print: './src/print.js',
    index: {
      dependOn: 'print',
      import: './src/index.js',
    },
  },
  // 输出
  output: {
    // publicPath: ASSET_PATH,
    publicPath: '', // 🔴 留空，避免覆盖运行时设置
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
});
