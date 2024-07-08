/**
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function aLoader(content, map, meta) {
  console.log('🌟content>>>', content);
  // 你的 webpack loader 代码
  //return content.replace('world', ", it's me");
  console.log('开始执行 aLoader Normal Loader--->');
  // content += 'aLoader]';

  const res = content.replace('world', 'webpack');

  // let temp = content + 'aLoader]';
  // console.log(temp.replace('world', 'xx'));
  return res;
  //return `module.exports = '${content}'`;
  //return content.replace('world', ', I am Xiaolang');

  // return temp;

  //return `export default ${JSON.stringify(content)}`;

  //return content.replace('world', ', I am Xiaolang');
}

module.exports = aLoader;
