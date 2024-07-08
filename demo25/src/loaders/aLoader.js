function aLoader(content, map, meta) {
  // 使用正则将 content 文件中所有的 console 语句替换成空
  return content.replace(/console\.log\([^@]*\);?/g, '');
}

module.exports = aLoader;
