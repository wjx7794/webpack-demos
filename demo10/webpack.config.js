const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    // print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 清理后再生成 dist
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // 🌟 start
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
  // 🌟 end
  plugins: [
    new HtmlWebpackPlugin({
      title: '模块热替换',
    }),
  ],
};
