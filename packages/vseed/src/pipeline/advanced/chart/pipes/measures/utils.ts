import type { MeasureEncoding, MeasureGroup, MeasureTree } from 'src/types'

/**
 * @description 检查是否为指标树, 指标树深度大于1. 如果存在一个指标为组, 即有children配置, 则认为是指标树.
 * @param vseed vseed
 * @returns
 */
export const isMeasureTreeWithChildren = <T extends MeasureTree>(measures?: T) => {
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
export const isMeasureTreeWithParentId = <T extends MeasureTree>(measures?: T) => {
  if (!measures) {
    return false
  }

  return measures.some((measure) => 'parentId' in measure)
}

/**
 * @description 保证指标树中的每一组都有children, 没有children的指标, 会被放到一个默认的指标组中.
 * @param measures 指标树
 * @returns
 */
export const normalizeMeasureTree = (measures: MeasureTree) => {
  const createEmptyMeasureGroup = (): MeasureGroup => {
    return {
      id: 'group',
      alias: '',
      children: [],
    }
  }

  let currentGroup: MeasureGroup = createEmptyMeasureGroup()
  const measureGroups: MeasureGroup[] = []
  for (const measure of measures) {
    if ('children' in measure) {
      // 当前指标组之前的所有独立指标成组
      if (currentGroup.children?.length) {
        currentGroup.id = [currentGroup.id, ...currentGroup.children.map((item) => item.id)].join('-')
        currentGroup.alias = currentGroup.children.map((item) => item.alias).join('-')
        measureGroups.push(currentGroup)
        currentGroup = createEmptyMeasureGroup()
      }
      // 当前是指标组
      measureGroups.push(measure)
    } else {
      currentGroup.children?.push(measure)
    }
  }

  // 最后一组
  if (currentGroup.children?.length) {
    currentGroup.id = [currentGroup.id, ...currentGroup.children.map((item) => item.id)].join('-')
    currentGroup.alias = currentGroup.children.map((item) => item.alias).join('-')
    measureGroups.push(currentGroup)
    currentGroup = createEmptyMeasureGroup()
  }

  return measureGroups
}

export const isCommonMeasureEncoding = (encoding: MeasureEncoding) => {
  return ['color', 'label', 'tooltip'].includes(encoding)
}

/**
 * @description Ensures that the measuresByView object has an initialized array for the given parentId.
 * If the parentId doesn't exist in measuresByView, it initializes an empty array and tracks the parentId.
 * @param parentId The parent ID to ensure initialization for
 * @param measuresByView The object mapping parent IDs to measures arrays
 * @param parentIds The array tracking all parent IDs that have been initialized
 */
export const ensureParentIdInitialized = <T>(
  parentId: string,
  measuresByView: { [key: string]: T[] },
  parentIds: string[],
) => {
  if (!measuresByView[parentId]) {
    measuresByView[parentId] = []
    parentIds.push(parentId)
  }
}
