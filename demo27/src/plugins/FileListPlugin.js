const PluginName = 'FileListPlugin';

class FileListPlugin {
  // 默认选项
  static defaultOptions = {
    outputFile: 'assets.md',
  };

  constructor(options = {}) {
    // 合并自定义选项和默认选项
    this.options = { ...FileListPlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    // webpack 模块实例，可以通过 compiler 对象访问，这样确保使用的是模块的正确版本
    // 不要直接 require 或 import webpack
    const { webpack } = compiler;

    // Compilation 对象提供了对一些有用常量的访问。
    const { Compilation } = webpack;

    // RawSource 是其中一种 “源码”("sources") 类型，
    // 用来在 compilation 中表示资源的源码
    const { RawSource } = webpack.sources;

    // 绑定到 “thisCompilation” 钩子，以便进一步绑定到 compilation 过程更早期的阶段
    compiler.hooks.thisCompilation.tap(PluginName, (compilation) => {
      // 绑定到资源处理流水线(assets processing pipeline)
      compilation.hooks.processAssets.tap(
        {
          name: PluginName,
          // 用某个靠后的资源处理阶段，确保所有资源已被插件添加到 compilation
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          // "assets" 是一个包含 compilation 中所有资源(assets)的对象。
          // 该对象的键是资源的路径，值是文件的源码
          // 遍历所有资源，
          // 生成 Markdown 文件的内容
          const content =
            '# In this build:\n\n' +
            Object.keys(assets)
              .map((filename) => `- ${filename}`)
              .join('\n');

          // 向 compilation 添加新的资源，
          // 这样 webpack 就会自动生成并输出到 output 目录
          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(content)
          );
        }
      );
    });
  }
}

module.exports = FileListPlugin;
