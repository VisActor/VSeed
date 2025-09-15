import type { Dimension, DimensionGroup, DimensionTree } from 'src/types'
import { isDimension, isDimensionGroup } from './typeGuard'

/**
 * @description 删除 dimensionTree 中符合 callback 条件的节点
 * @param dimensionTree 待删除的 dimensionTree
 * @param callback 回调函数，用于判断是否删除当前节点
 * @returns 删除后的 dimensionTree
 */
export const deleteDimensionTreeByCallback = <T extends DimensionTree>(
  dimensionTree?: T,
  callback?: (dimension: Dimension, index: number, dimensions: (Dimension | DimensionGroup)[]) => boolean,
) => {
  if (!dimensionTree) {
    return dimensionTree
  }
  const stack: (Dimension | DimensionGroup)[] = [...dimensionTree].reverse()
  const parents = new Map<Dimension | DimensionGroup, (Dimension | DimensionGroup)[]>()

  dimensionTree.forEach((node) => {
    parents.set(node, dimensionTree)
  })

  const nodesToProcess: (Dimension | DimensionGroup)[] = []
  const visited = new Set<Dimension | DimensionGroup>()

  while (stack.length > 0) {
    const node = stack[stack.length - 1]

    if (isDimensionGroup(node) && node.children && !visited.has(node)) {
      visited.add(node)
      const children = node.children.slice().reverse()
      for (const child of children) {
        parents.set(child, node.children)
        stack.push(child)
      }
    } else {
      stack.pop()
      nodesToProcess.push(node)
    }
  }

  for (const node of nodesToProcess) {
    const parentList = parents.get(node)

    if (parentList) {
      const index = parentList.indexOf(node)
      if (isDimension(node)) {
        if (callback?.(node, index, parentList)) {
          parentList.splice(index, 1)
        }
      }
    }
  }

  return dimensionTree
}
