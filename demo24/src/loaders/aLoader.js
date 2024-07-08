const { urlToRequest } = require('loader-utils');
const { validate } = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
};

function aLoader(content, map, meta) {
  // 开始缓存
  this.cacheable && this.cacheable(false);
  console.log('🌟NEW>>>');

  const options = this.getOptions(); // { name: 'Jack' }
  console.log('The request path>>>', urlToRequest(this.resourcePath)); //Users/wangjunxiang/Documents/Projects/webpack-demos/demo24/src/index.js

  validate(schema, options);

  const res = content.replace('world', `${options.name}`);
  this.callback(null, res, map);
  return undefined;
}

module.exports = aLoader;
