import _ from 'lodash';
import printMe from './print.js';
import './styles.css';

function component() {
  // 1. 创建 div
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  // 2. 创建按钮
  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  // 3. 将按钮加到 div 中
  element.appendChild(btn);

  // 4. 返回 div
  return element;
}

// 存储 element，以在 print.js 修改时重新渲染
let element = component();
// 添加到页面文档中
document.body.appendChild(element);

if (module.hot) {
  // 监听文件
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    // 重新渲染 "component"，以便更新 click 事件处理函数
    element = component();
    document.body.appendChild(element);
  });
}
