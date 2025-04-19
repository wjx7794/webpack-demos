const { SyncLoopHook } = require('tapable');

// 初始化钩子，定义形参
const hook = new SyncLoopHook();

let count = 5;

// 注册事件1
hook.tap('事件1', (name, age) => {
  count--;
  console.log('事件1执行,count为', count);
  if (count > 3) {
    return true;
  }
});

// 注册事件2
hook.tap('事件2', () => {
  count--;
  console.log('事件2执行,count为', count);
  if (count > 1) {
    return true;
  }
});

// 注册事件3
hook.tap('事件3', () => {
  console.log('事件3执行,count为', count);
});

// 触发事件
hook.call();

// 执行结果
// 事件1执行,count为 4
// 事件1执行,count为 3
// 事件2执行,count为 2
// 事件1执行,count为 1
// 事件2执行,count为 0
// 事件3执行,count为 0
