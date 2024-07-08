const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 清理后再生成 dist
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'aLoader',
            options: {
              flag: true,
            },
          },
          {
            loader: 'bLoader',
            options: {
              flag: false,
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    modules: ['node_modules', './src/loaders'],
  },
};
