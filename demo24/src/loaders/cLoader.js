function cLoader(content, map, meta) {
  // 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
  console.log(content instanceof Buffer); // true

  const res = String(content).replace('world', `webpack`);
  this.callback(null, res, map);
  return undefined;
}

module.exports = cLoader;

// 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据
module.exports.raw = true;
