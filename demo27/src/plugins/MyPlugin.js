const PluginName = 'MyPlugin';

class MyPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.entryOption.tap(PluginName, (context, entry) => {
      console.log('🔥1. entryOption->');
      console.log('context>>>', context); // /Users/wangjunxiang/Documents/Projects/webpack-demos/demo27
      console.log('entry>>>', entry); // { index: { import: [ './src/index.js' ] } }
    });

    compiler.hooks.beforeRun.tapAsync(PluginName, (compiler, callback) => {
      // console.log('compiler>>>', Object.keys(compiler));
      setTimeout(() => {
        console.log('🔥2. beforeRun->');
        callback();
      }, 100);
    });

    compiler.hooks.run.tapAsync(PluginName, (compiler, callback) => {
      setTimeout(() => {
        console.log('🔥3. run->');
        callback();
      }, 100);
    });

    compiler.hooks.beforeCompile.tapAsync(
      PluginName,
      (compilationParams, callback) => {
        setTimeout(() => {
          console.log('🔥4. beforeCompile->');
          compilationParams.customData = { name: 'Jack' };
          callback();
        }, 1000);
      }
    );

    compiler.hooks.compile.tap(PluginName, (compilationParams) => {
      console.log('🔥5. compile->', Object.keys(compilationParams));
      // compilation -> [ 'normalModuleFactory', 'contextModuleFactory', 'customData' ]
    });

    compiler.hooks.compilation.tap(
      PluginName,
      (compilation, compilationParams) => {
        console.log('🔥7. compilation->');
      }
    );

    // webpack 模块实例，可以通过 compiler 对象访问，这样确保使用的是模块的正确版本
    // 不要直接 require 或 import webpack
    const { webpack } = compiler;
    // Compilation 对象提供了对一些有用常量的访问。
    const { Compilation } = webpack;
    // RawSource 是其中一种 “源码”("sources") 类型，
    // 用来在 compilation 中表示资源的源码
    const { RawSource } = webpack.sources;
    compiler.hooks.thisCompilation.tap(
      PluginName,
      (compilation, compilationParams) => {
        console.log('🔥6. thisCompilation->');
        let count = 1;
        compilation.hooks.processAssets.tap(
          {
            name: PluginName,
            stage: Compilation.PROCESS_ASSETS_STAGE_DERIVED,
            additionalAssets: (assets) => {
              console.log('🍂additionalAssets->', count++);
            },
          },
          (assets) => {
            console.log('🍃DERIVED->', assets);
          }
        );

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
            console.log('🍃SUMMARIZE->', assets);
            compilation.emitAsset('hello.txt', new RawSource('Hello World'));
          }
        );
      }
    );

    compiler.hooks.emit.tapPromise(PluginName, (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('🔥8. emit->');
          resolve();
        }, 1000);
      });
    });

    compiler.hooks.afterEmit.tapPromise(PluginName, (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('🔥9. afterEmit->');
          resolve();
        }, 100);
      });
    });

    compiler.hooks.done.tapAsync(PluginName, (stats, callback) => {
      setTimeout(() => {
        console.log('🔥10. done->');
        callback();
      }, 100);
    });

    compiler.hooks.assetEmitted.tap(PluginName, (file, info) => {
      // console.log('file>>>', file);
      // console.log('info>>>', Object.keys(info));
      // console.log('congtent>>>', String(info?.content));
      console.log('🔥11. assetEmitted->');
    });

    compiler.hooks.make.tap(PluginName, (compilation) => {
      console.log('🔥7.5make->');
    });
  }
}

module.exports = MyPlugin;
