// b.mjs
console.log('b 开始执行');
import { aDone } from './a.mjs'; // 预处理阶段建立引用，此时 a.mjs 的 aDone 是未初始化的引用
export let bDone = false;
console.log('在 b 中，aDone =', aDone);
bDone = true;
console.log('b 执行结束');
