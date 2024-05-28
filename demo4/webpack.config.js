const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 清理后再生成 dist
    clean: true,
    publicPath: '/',
  },
  // 开启 sourceMap
  devtool: 'inline-source-map',
  devServer: {
    // 告诉 dev server 应从什么位置开始查找文件
    static: './dist',
  },
  // 由于在这个示例中单个 HTML 页面有多个入口，所以添加了 optimization.runtimeChunk: 'single' 配置
  // optimization: {
  //   runtimeChunk: 'single',
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
};
