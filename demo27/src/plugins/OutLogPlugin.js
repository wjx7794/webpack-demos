const PluginName = 'MyPlugin';

class OutLogPlugin {
  // 默认选项
  static defaultOptions = {
    outFileName: 'outLog',
  };
  constructor(options = {}) {
    // 合并自定义选项和默认选项
    this.options = { ...OutLogPlugin.defaultOptions, ...options };
  }
  apply(compiler) {
    // 从编译器对象访问 webpack 模块实例，并且可以保证 webpack 版本正确
    const { webpack } = compiler;
    // 获取 Compilation 后续会用到 Compilation 提供的 stage
    const { Compilation } = webpack;
    // RawSource 是其中一种 “源码”("sources") 类型，用来在 compilation 中表示资源的源码
    const { RawSource } = webpack.sources;
    /** compiler.hooks.<hoonkName>.tap/tapAsync/tapPromise */
    compiler.hooks.compilation.tap(PluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: PluginName,
          // 选择适当的 stage，具体参见：
          // https://webpack.js.org/api/compilation-hooks/#list-of-asset-processing-stages
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          let res = `buildTime: ${new Date().toLocaleString()}\n\n`;
          res += `| fileName  | fileSize  |\n| --------- | --------- |\n`;
          Object.entries(assets).forEach(([pathname, source]) => {
            res += `| ${pathname} | ${source.size()} bytes |\n`;
          });
          // 生成
          const filename = `${this.options.outFileName}.md`;
          compilation.assets[filename] = new RawSource(res);
          // compilation.emitAsset(
          //   `${this.options.outFileName}.md`,
          //   new RawSource(res)
          // );
        }
      );
    });
  }
}

module.exports = OutLogPlugin;
