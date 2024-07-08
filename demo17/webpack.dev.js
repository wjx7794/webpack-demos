const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = merge(common, {
  module: {
    rules: [
      // images 图像
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // 所有 .svg 文件都将作为 data URI 注入到 bundle 中
        type: 'asset/inline',
        generator: {
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
      },
      // txt
      {
        test: /\.txt/,
        type: 'asset/source',
      },
    ],
  },
});
