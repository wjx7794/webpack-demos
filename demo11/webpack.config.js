const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'development',
  // optimization: {
  //   usedExports: true,
  //   minimize: false,
  // },

  /**------------------------- start -------------------------*/
  // 通过 import 和 export 语法，我们已经找出需要删除的死代码，然而，不仅仅是要找出，还应在 bundle 中删除它们。
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        sideEffects: true,
      },
    ],
  },
  /**------------------------- end -------------------------*/

  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 清理后再生成 dist
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tree Shaking',
    }),
  ],
};
