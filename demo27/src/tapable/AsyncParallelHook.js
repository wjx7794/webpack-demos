const { AsyncParallelHook } = require('tapable');

// 初始化钩子，定义形参
const hook = new AsyncParallelHook(['name', 'age']);

// 注册事件1
hook.tapAsync('事件1', (name, age, callback) => {
  setTimeout(() => {
    console.log('事件1执行:', name, age);
    // 调用callback，表示该事件执行完毕
    callback(null, '事件1参数');
  }, 1000);
});

// 注册事件2
hook.tapAsync('事件2', (name, age, callback) => {
  console.log('事件2执行:', name, age);
  // 调用callback，表示该事件执行完毕
  callback();
});

// 注册事件3
hook.tapAsync('事件3', (name, age, callback) => {
  console.log('事件3执行:', name, age);
  // 调用callback，表示该事件执行完毕
  callback();
});

// 触发事件，传入实参
hook.callAsync('前端', 18, () => {
  // 该钩子注册的所有事件执行完毕后，会执行该回调
  console.log('该钩子所有事件执行完毕');
});

// 执行结果
// 事件2执行: 前端 18
// 事件3执行: 前端 18
// 2秒后输出：事件1执行: 前端 18
// 该钩子所有事件执行完毕
