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

  /*------------------ start ------------------*/
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    // 从 webpack-dev-server v4.0.0 开始，模块热替换是默认开启的
    hot: true,
  },
  /*------------------ end -------------------*/
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '模块热替换',
    }),
  ],
};
