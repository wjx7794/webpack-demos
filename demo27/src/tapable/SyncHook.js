const { SyncHook } = require('tapable');

// 初始化钩子，定义形参
const hook = new SyncHook(['name', 'age']);

// 注册事件1
hook.tap('事件1', (name, age) => {
  console.log('事件1执行:', name, age);
});

// 注册事件2
hook.tap('事件2', (name, age) => {
  console.log('事件2执行:', name, age);
});

// 触发事件，传入实参
hook.call('Jack', 28);

// 执行结果
// 事件1执行: Jack 28
// 事件2执行: Jack 28
