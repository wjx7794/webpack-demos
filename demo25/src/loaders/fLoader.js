const fLoader = function (content) {};
const fLoaderPitch = function (remainingRequest) {
  /* 
    将绝对路径：
      /Users/wangjunxiang/Documents/Projects/webpack-demos/demo25/node_modules/css-loader/dist/cjs.js!
        /Users/wangjunxiang/Documents/Projects/webpack-demos/demo25/src/index.css
    转换为相对路径：
      ../node_modules/css-loader/dist/cjs.js!./index.css
  */
  console.log(remainingRequest);
  const resolvePath = remainingRequest
    .split('!')
    .map((absolutePath) => {
      // 通过本 loader 所在的上下文环境和绝对路径，返回一个相对路径
      return this.utils.contextify(this.context, absolutePath);
    })
    .join('!');
  console.log(resolvePath);

  const url =
    '/Users/wangjunxiang/Documents/Projects/webpack-demos/demo25/node_modules/css-loader/dist/cjs.js';
  console.log('🌟>>>', this.utils.contextify(this.context, url));

  console.log('this.resourcePath>>>', this.resourcePath);

  console.log('this.resource', this.resource);

  // 创建 style 标签，将 css-loader 处理后的内容插入到 html 中
  // '!!' 在 inline loader内跳过 pre，normal，post loader的执行，这里跳过引入的 css loader 后续阶段的自动执行
  const script = `
    import style from '!!${resolvePath}'
    const styleEl = document.createElement('style')
    styleEl.innerHTML = style 
    document.head.appendChild(styleEl)
  `;

  // 熔断后续 loader 的执行
  return script;
};
module.exports = fLoader;
module.exports.pitch = fLoaderPitch;
