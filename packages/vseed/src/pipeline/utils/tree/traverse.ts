/**
 * 支持泛型的非递归前序遍历
 * @param tree 根节点数组
 * @param callback 遍历时对每个节点执行的回调，返回 true 时停止遍历
 */
export const preorderTraverse = <T extends { id: string }, U extends { id: string; children?: (T | U)[] }>(
  tree: (T | U)[],
  callback: (node: T | U) => boolean,
) => {
  if (!tree || tree.length === 0) return

  const stack: (T | U)[] = [...tree].reverse()

  while (stack.length > 0) {
    const node = stack.pop()!
    const stop = callback(node)
    if (stop === true) {
      return
    }
    if (!('children' in node)) {
      continue
    }
    const children = node.children
    if (children && children.length > 0) {
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i]
        stack.push(child)
      }
    }
  }
}
