const data = [1, 2, 3];
export function getData() {
  return data;
}
const result = data.reduce((acc, val) => acc + val, 0);
// console.log(result);
