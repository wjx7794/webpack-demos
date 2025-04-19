function gLoader(content, map, meta) {
  console.log(this.resource); // /Users/wangjunxiang/Documents/Projects/webpack-demos/demo25/src/header.js?name=Jack
  console.log(this.resourcePath); // /Users/wangjunxiang/Documents/Projects/webpack-demos/demo25/src/header.js
  console.log(this.resourceQuery); // ?name=Jack

  const originUrl =
    '/Users/wangjunxiang/Documents/Projects/webpack-demos/demo25/src/header.js?name=Jack';
  const newUrl = this.utils.contextify(this.context, originUrl); // ./header.js?name=Jack
  console.log('🌟>>>', newUrl); //  ./header.js?name=Jack

  const anotherUrl = this.utils.absolutify(this.context, newUrl); // /Users/wangjunxiang/Documents/Projects/webpack-demos/demo25/src/header.js
  console.log('anotherUrl>>>', anotherUrl);
  return content;
}

module.exports = gLoader;
