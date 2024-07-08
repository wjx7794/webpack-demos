// import { urlToRequest } from 'loader-utils';
const loaderUtils = require('loader-utils');

module.exports = function (content, map, meta) {
  console.log('DATA>>>', this.data);
  console.log('content>>>', content);
  // 获取到用户给当前 Loader 传入的 options
  //const options = loaderUtils.getOptions(this);
  console.log('options-inside-->', this.query);
  console.log('The request path', loaderUtils.urlToRequest(this.resourcePath));
  //console.log('keys-->', Object.keys(loaderUtils || {}));
  // 在这里按照你的需求处理 source
  return content.replace('world', ', I am Xiaolang');
};

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  data.value = 42;
};
