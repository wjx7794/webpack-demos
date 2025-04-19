const JSZip = require('jszip');

const PluginName = 'CompressAssetsPlugin';

class CompressAssetsPlugin {
  constructor({ output }) {
    this.output = output;
  }

  apply(compiler) {
    // 从编译器对象访问 webpack 模块实例，并且可以保证 webpack 版本正确
    const { webpack } = compiler;
    // 获取 Compilation 后续会用到 Compilation 提供的 stage
    const { Compilation } = webpack;
    // RawSource 是其中一种 “源码”("sources") 类型，
    // 用来在 compilation 中表示资源的源码
    const { RawSource } = webpack.sources;

    /** compiler.hooks.<hoonkName>.tap/tapAsync/tapPromise */
    compiler.hooks.thisCompilation.tap(PluginName, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: PluginName,
          // 选择适当的 stage，具体参见：
          // https://webpack.js.org/api/compilation-hooks/#list-of-asset-processing-stages
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_HASH,
        },
        (assets, callback) => {
          // 创建zip对象
          const zip = new JSZip();
          // 循环每一个资源
          for (const [name, source] of Object.entries(assets)) {
            // 调用source()方法获得对应的源代码 这是一个源代码的字符串
            const sourceCode = source.source();
            // 往 zip 对象中添加资源名称和源代码内容
            zip.file(name, sourceCode);
          }

          // 调用 zip.generateAsync 生成 zip 压缩包
          zip.generateAsync({ type: 'nodebuffer' }).then((result) => {
            // 通过 new RawSource 创建压缩包
            // 并且同时通过 compilation.emitAsset 方法将生成的 Zip 压缩包输出到 this.output
            compilation.emitAsset(this.output, new RawSource(result));
            // compilation.assets[this.output] = new RawSource(result);
            callback();
          });
        }
      );
    });
  }
}

module.exports = CompressAssetsPlugin;
