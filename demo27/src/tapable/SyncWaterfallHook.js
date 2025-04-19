const { SyncWaterfallHook } = require('tapable');

// 初始化钩子，定义形参
const hook = new SyncWaterfallHook(['name', 'age']);

// 注册事件1
hook.tap('事件1', (name, age) => {
  console.log('事件1执行:', name, age);
  return '驿站';
});

// 注册事件2
hook.tap('事件2', (name, age) => {
  console.log('事件2执行:', name, age);
});

// 注册事件3
hook.tap('事件3', (name, age) => {
  console.log('事件3执行:', name, age);
});

// 触发事件，传入实参
hook.call('前端', 18);

// 执行结果
// 事件1执行: 前端 18
// 事件2执行: 驿站 18
// 事件3执行: 驿站 18
