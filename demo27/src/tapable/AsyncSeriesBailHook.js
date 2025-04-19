const { AsyncSeriesBailHook } = require('tapable');

// 初始化钩子，定义形参
const hook = new AsyncSeriesBailHook(['name', 'age']);

// 注册事件1
hook.tapAsync('事件1', (name, age, callback) => {
  setTimeout(() => {
    console.log('事件1执行:', name, age);
    // 调用callback，表示该事件执行完毕
    callback(null);
  }, 4000);
});

// 注册事件2
hook.tapAsync('事件2', (name, age, callback) => {
  setTimeout(() => {
    console.log('事件2执行:', name, age);
    callback(null, '事件2参数');
  }, 3000);
});

// 注册事件3
hook.tapAsync('事件3', (name, age, callback) => {
  setTimeout(() => {
    console.log('事件3执行:', name, age);
    // 调用callback，表示该事件执行完毕
    callback(null, '事件3参数');
  }, 2000);
});

// 触发事件，传入实参
hook.callAsync('前端', 18, (err, result) => {
  // 最后结束的事件调用的callback会传入两个参数，第一个参数为错误信息，第二个参数为返回值
  console.log('该钩子所有事件执行完毕', result);
});

// 执行结果
// 事件1执行: 前端 18
// 事件2执行: 前端 18
// 该钩子所有事件执行完毕 customData
