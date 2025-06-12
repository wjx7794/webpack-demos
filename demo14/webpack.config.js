const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

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
  },

  /*-------------------------------- start --------------------------------*/
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Shimming 预置依赖',
    }),
    new webpack.ProvidePlugin({
      // _: 'lodash',
      // 暴露出某个模块中的单个导出，通过配置一个 "数组路径" (例如 [module, child, ...children?]) 实现此功能
      join: ['lodash', 'join'], // 无论 join 方法在何处调用，我们都只会获取到 lodash 中提供的 join 方法
    }),
  ],
  module: {
    rules: [
      {
        test: require.resolve('./src/index.js'),
        use: 'imports-loader?wrapper=window',
      },
      /**--------------------------- start ---------------------------*/
      {
        test: require.resolve('./src/globals.js'),
        use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',
      },
      /**--------------------------- end -----------------------------*/
    ],
  },
  /*-------------------------------- end --------------------------------*/
};
