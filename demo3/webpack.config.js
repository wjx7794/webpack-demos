const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    // 在 entry 添加 src/print.js 作为新的入口起点 (命名为 print)
    print: './src/print.js',
  },
  output: {
    // 修改 output 使得能够根据入口起点定义的名称动态生成 bundle 名称
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 清理后再生成 dist
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出',
    }),
  ],
};
