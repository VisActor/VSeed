import type { Measure, MeasureGroup, MeasureTree } from "src/types"
import { preorderTraverse } from "../tree/traverse"

/**
 * 获取measures的深度
 * @param measures
 * @param id
 * @returns
 */
export const measureDepth = (measures: MeasureTree = []): number => {
  if (!measures) return 0
  let depth = 1
  preorderTraverse<Measure, MeasureGroup>(measures, (node) => {
    if ('children' in node) {
      depth = Math.max(depth, 1 + measureDepth(node.children))
    }
    return false
  })
  return depth
}
