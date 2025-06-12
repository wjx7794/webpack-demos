const { file, parse } = require('./globals.js');
console.log(file);
parse();

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = join(['Hello', 'webpack'], ' ');

  // 假设我们处于 `window` 上下文
  this.alert("Hmmm, this probably isn't a great idea...");

  btn.innerHTML = 'Click me and check the console!';
  btn.addEventListener('click', async () => {
    const printMe = await import('./print.js');
    printMe.default(); // 注意动态导入返回 Promise
  });

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
