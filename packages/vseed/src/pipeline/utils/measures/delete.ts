import type { Measure, MeasureGroup, MeasureTree } from 'src/types'
import { isMeasure, isMeasureGroup } from './typeGuard'

/**
 * @description 删除 measureTree 中符合 callback 条件的节点
 * @param measureTree 待删除的 measureTree
 * @param callback 回调函数，用于判断是否删除当前节点
 * @returns 删除后的 measureTree
 */
export const deleteMeasureTreeByCallback = <T extends MeasureTree>(
  measureTree?: T,
  callback?: (measure: Measure, index: number, measures: (Measure | MeasureGroup)[]) => boolean,
) => {
  if (!measureTree) {
    return measureTree
  }
  const stack: (Measure | MeasureGroup)[] = [...measureTree].reverse()
  const parents = new Map<Measure | MeasureGroup, (Measure | MeasureGroup)[]>()

  measureTree.forEach((node) => {
    parents.set(node, measureTree)
  })

  const nodesToProcess: (Measure | MeasureGroup)[] = []
  const visited = new Set<Measure | MeasureGroup>()

  while (stack.length > 0) {
    const node = stack[stack.length - 1]

    if (isMeasureGroup(node) && node.children && !visited.has(node)) {
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
      if (isMeasure(node)) {
        if (callback?.(node, index, parentList)) {
          parentList.splice(index, 1)
        }
      } else if (isMeasureGroup(node)) {
        if (!node.children || node.children.length === 0) {
          parentList.splice(index, 1)
        }
      }
    }
  }

  return measureTree
}
