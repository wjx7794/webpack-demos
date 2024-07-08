const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 要使用 env 变量，你必须将 module.exports 转换成一个函数
module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log(env);
  /*
  {
    WEBPACK_BUNDLE: true,
    WEBPACK_BUILD: true,
    goal: 'local',
    production: true
  }
  */

  return {
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
        title: '环境变量',
      }),
    ],
  };
};
