const { AsyncParallelBailHook } = require('tapable');

// 初始化钩子，定义形参
const hook = new AsyncParallelBailHook(['name', 'age']);

// 注册事件1
hook.tapPromise('事件1', (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('事件1执行:', name, age);
      resolve('stop');
    }, 1000);
  });
});

// 注册事件2
hook.tapPromise('事件2', (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('事件2执行:', name, age);
      resolve();
    }, 2000);
  });
});

// 注册事件3
hook.tapPromise('事件3', (name, age, callback) => {
  return new Promise((resolve) => {
    console.log('事件3执行:', name, age);
    resolve();
  });
});

// 触发事件，传入实参
hook.promise('前端', 18).then((res) => {
  // 该钩子注册的所有事件执行完毕后，会执行该回调
  console.log('该钩子所有事件执行完毕', res);
});

// 执行结果
// 事件3执行: 前端 18
// 2秒后输出：事件1执行: 前端 18
// 该钩子所有事件执行完毕123
// 事件2执行: 前端 18
