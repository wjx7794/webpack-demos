const fs = require('fs');

const PluginName = 'CopyPlugin';

class CopyPlugin {
  constructor(options) {
    this.from = options.from;
    this.to = options.to;
  }
  apply(compiler) {
    const { webpack } = compiler;
    // Compilation 对象提供了对一些有用常量的访问。
    const { Compilation } = webpack;
    // RawSource 是其中一种 “源码”("sources") 类型，
    // 用来在 compilation 中表示资源的源码
    const { RawSource } = webpack.sources;

    const { from, to } = this;
    const isDir = fs.statSync(from).isFile() ? false : true;
    compiler.hooks.done.tap(PluginName, (stats) => {
      fs.cp(from, to, { recursive: isDir }, (err) => {
        if (err) {
          throw err;
        }
        console.log('stats>>>', stats.compilation.assets);
      });
      stats.compilation.emitAsset('hello.txt', new RawSource('Hello World'));
    });
  }
}

module.exports = CopyPlugin;
