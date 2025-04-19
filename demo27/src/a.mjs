// a.mjs
console.log('a 开始执行');
import { bDone } from './b.mjs'; // 预处理阶段建立引用，但此时 b.mjs 尚未执行
export let aDone = false;
console.log('在 a 中，bDone =', bDone);
aDone = true;
console.log('a 执行结束');
