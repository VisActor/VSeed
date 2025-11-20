/**
 * 支持泛型与可配置子节点键名的非递归前序遍历
 * @param tree 根节点数组
 * @param callback 遍历时对每个节点执行的回调，返回 true 时停止遍历
 * @param childrenKey 子节点键名（默认 'children'）
 */
type WithChildren<Node, K extends string> = Node & { [P in K]?: Node[] }

export const preorderTraverse = <Node, K extends string = 'children'>(
  tree: Node[],
  callback: (node: Node) => boolean,
  childrenKey: K = 'children' as K,
) => {
  if (!tree || tree.length === 0) return

  const stack: Node[] = [...tree].reverse()

  while (stack.length > 0) {
    const node = stack.pop() as Node
    const stop = callback(node)
    if (stop === true) {
      return
    }

    const children = (node as WithChildren<Node, K>)[childrenKey]
    if (Array.isArray(children) && children.length > 0) {
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i]
        stack.push(child)
      }
    }
  }
}

export const findTreeNodesBy = <Node, K extends string = 'children'>(
  nodes: Node[] = [],
  callback: (node: Node) => boolean,
  childrenKey: K = 'children' as K,
): Node[] => {
  if (!nodes) return []
  const result: Node[] = []
  preorderTraverse<Node, K>(nodes, (node) => {
    if (!(childrenKey in (node as WithChildren<Node, K>))) {
      if (callback(node)) {
        result.push(node)
      }
    }
    return false
  })
  return result
}
