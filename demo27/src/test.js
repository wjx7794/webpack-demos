// 输出
// const demo = {
//     id: 1,
//     path: "1",
//     children: [
//         {
//             id: 2,
//             path: "1-2",
//             children: [
//                 { id: 4, path: "1-2-4", children: [] },
//                 { id: 5, path: "1-2-5", children: [] }
//             ]
//         },
//         {
//             id: 3,
//             path: "1-3",
//             children: []
//         }
//     ]
// }

const getResult = (root) => {
  const dfs = (tree, path) => {
    tree.forEach((node) => {
      const newPath = `${path}-${node.id}`;
      node.path = newPath;
      dfs(node.children || [], newPath);
    });
  };
  root.path = String(root.id);
  dfs(root.children, root.path);
  return root;
};

// const getResult = (root) => {
//   const dfs = (tree, path) => {
//     (tree || []).forEach((node) => {
//       let newPath = `${path}-${node.id}`;
//       node.path = newPath;
//       dfs(node.children || [], newPath);
//     });
//   };
//   root.path = String(root.id);
//   dfs(root.children, root.path);
//   return root;
// };

// 输入
const root = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        { id: 4, children: [] },
        { id: 5, children: [] },
      ],
    },
    {
      id: 3,
      children: [],
    },
  ],
};

const res = getResult(root);
console.log(JSON.stringify(res));
