const babel = require('@babel/core');

function cLoader(content, map, meta) {
  const callback = this.async();
  const options = this.getOptions();
  /* 
    使用 babel 编译代码
      param1: code 代码内容
      param2: options 对应的预设
      param3: callback 回调函数，其中 result 返回值为 { code, map, ast } 对象
  */
  babel.transform(content, options, function (err, result) {
    // result 的返回值为 { code, map, ast }，这里直接获取解析后的 code 传入给异步 loader 执行即可
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  });
}

module.exports = cLoader;
