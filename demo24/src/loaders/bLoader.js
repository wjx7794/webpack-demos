// 模拟异步函数
const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

// 转化源代码
const transform = (sourceCode, name = '') => {
  return sourceCode.replace('world', name);
};

// 发起异步请求
const asyncOperation = async (inputParams) => {
  await sleep(1000);

  const { sourceCode, fn, extraParams } = inputParams || {};
  fn(null, transform(sourceCode, extraParams?.options?.name));
};

function bLoader(content, map, meta) {
  // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
  var callback = this.async();

  const options = this.getOptions(); // { name: 'Jack' }

  const inputParams = {
    // 源代码
    sourceCode: content,
    // 回调函数
    fn: (err, result, sourceMaps, ast) => {
      // 通过 callback 返回异步执行后的结果
      callback(err, result, sourceMaps, ast);
    },
    // 额外参数
    extraParams: {
      options,
    },
  };
  asyncOperation(inputParams);
}

module.exports = bLoader;
