const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
      // txt
      {
        test: /\.txt/,
        type: 'asset/source',
      },
      // css
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
