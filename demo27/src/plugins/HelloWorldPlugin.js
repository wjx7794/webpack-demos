const { validate } = require('schema-utils');

const PluginName = 'HelloWorldPlugin';
const schema = {
  type: 'object',
  properties: {
    author: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
  },
  additionalProperties: false,
};

class HelloWorldPlugin {
  constructor(options = {}) {
    // 使用 schema-utils 来校验传入插件的选项
    const res = validate(schema, options, {
      name: 'HelloWorldPlugin',
      baseDataPath: 'options',
    });
  }

  apply(compiler) {
    compiler.hooks.done.tap(
      PluginName,
      (stats /* 绑定 done 钩子后，stats 会作为参数传入。 */) => {
        console.log('🔥Hello World!');
      }
    );

    // 指定一个挂载到 compilation 的钩子，回调函数的参数为 compilation 。
    compiler.hooks.compilation.tap(PluginName, (compilation) => {
      // 现在可以通过 compilation 对象绑定各种钩子
      compilation.hooks.optimize.tap(PluginName, () => {
        console.log('资源已经优化完毕');
      });
    });
  }
}

module.exports = HelloWorldPlugin;
