const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const svgToMiniDataURI = require('mini-svg-data-uri');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log('🌟process.env.NODE_ENV>>>', process.env.NODE_ENV);

module.exports = merge(common, {
  mode: 'production',
  entry: {
    home: ['./src/home.js', './src/home.scss'],
    account: ['./src/account.js', './src/account.scss'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
});
