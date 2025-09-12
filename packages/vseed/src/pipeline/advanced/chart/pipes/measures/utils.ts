import type { AdvancedVSeed, VSeed } from 'src/types'

/**
 * @description 检查是否为指标树, 指标树深度大于1. 如果存在一个指标为组, 即有children配置, 则认为是指标树.
 * @param vseed vseed
 * @returns
 */
export const isMeasureTreeWithChildren = (vseed: VSeed | AdvancedVSeed) => {
  const { measures } = vseed

  if (!measures) {
    return false
  }

  return measures.some((measure) => 'children' in measure)
}

/**
 * @description 检查是否为指标树, 指标树存在parentId. 如果存在一个指标有parentId, 则认为是指标树.
 * @param vseed vseed
 * @returns
 */
export const isMeasureTreeWithParentId = (vseed: VSeed | AdvancedVSeed) => {
  const { measures } = vseed

  if (!measures) {
    return false
  }

  return measures.some((measure) => 'parentId' in measure)
}
