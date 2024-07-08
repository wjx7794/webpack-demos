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
      // {
      //   test: /\.txt$/i,
      //   use: ['aLoader', 'bLoader', 'cLoader'],
      // },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'bLoader',
      //       options: {
      //         author: 'Jack',
      //         age: 18,
      //       },
      //     },
      //   ],
      //   // enforce: 'pre',
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'gLoader',
            options: {
              a: 1,
            },
          },
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: ['fLoader?a=1', 'css-loader'],
      // },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'cLoader',
      //     },
      //   ],
      //   enforce: 'post',
      // },
    ],
  },
  resolveLoader: {
    modules: ['node_modules', './src/loaders'],
  },
};
