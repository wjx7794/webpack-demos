const { resolve } = require('path');
const fs = require('fs');

const PluginName = 'BundleSizeWebpackPlugin';

class BundleSizeWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const { sizeLimit } = this.options;
    // 从编译器对象访问 webpack 模块实例，并且可以保证 webpack 版本正确
    const { webpack } = compiler;
    // 获取 Compilation 后续会用到 Compilation 提供的 stage
    const { Compilation } = webpack;
    // 在编译完成后，执行回调，拿到打包后文件路径，然后读取文件信息获取文件大小，然后定义一些逻辑
    compiler.hooks.compilation.tap(PluginName, (compilation) => {
      const {
        outputOptions: { path },
      } = compilation;
      compilation.hooks.processAssets.tap(
        {
          name: PluginName,
          // 选择适当的 stage，具体参见：
          // https://webpack.js.org/api/compilation-hooks/#list-of-asset-processing-stages
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          for (const filename of Object.keys(assets)) {
            const bundlePath = resolve(path, filename);
            const { size } = fs.statSync(bundlePath);
            const bundleSize = size / 1024;
            if (bundleSize < sizeLimit) {
              console.log(
                'safe: bundle-size',
                bundleSize,
                '\n size limit: ',
                sizeLimit
              );
            } else {
              console.warn(
                'unsafe: bundle-size',
                bundleSize,
                '\n size limit: ',
                sizeLimit
              );
            }
          }
        }
      );
    });
  }
}

module.exports = BundleSizeWebpackPlugin;
