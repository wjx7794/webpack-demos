const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ConsoleLogOnBuildWebpackPlugin = require('./src/plugins/ConsoleLogOnBuildWebpackPlugin');
const MyPlugin = require('./src/plugins/MyPlugin');
const HelloWorldPlugin = require('./src/plugins/HelloWorldPlugin');
const FileListPlugin = require('./src/plugins/FileListPlugin');
const OutLogPlugin = require('./src/plugins/OutLogPlugin');
const CompressAssetsPlugin = require('./src/plugins/CompressAssetsPlugin');
const BundleSizeWebpackPlugin = require('./src/plugins/BundleSizeWebpackPlugin');
const CopyPlugin = require('./src/plugins/CopyPlugin');
const CleanPlugin = require('./src/plugins/CleanPlugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 清理后再生成 dist
    //clean: true,
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
    //new ConsoleLogOnBuildWebpackPlugin({ mode: 'dev' }),
    //new MyPlugin({ author: 'Jack', age: 28 }),
    // new CopyPlugin({
    //   from: path.resolve(__dirname, 'public'),
    //   to: path.resolve(__dirname, 'dist', 'public'),
    // }),
    new CleanPlugin(),
    //new HelloWorldPlugin({ author: 'Jack', age: 28 }),
    // 使用任意支持的选项
    // new FileListPlugin({
    //   outputFile: 'my-assets.md',
    // }),
    new OutLogPlugin({ outFileName: 'outLog' }),
    new CompressAssetsPlugin({ output: 'source.zip' }),
    //new BundleSizeWebpackPlugin({ sizeLimit: 1 }),
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
            loader: 'loader4',
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
