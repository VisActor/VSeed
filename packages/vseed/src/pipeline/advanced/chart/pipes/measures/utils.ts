import type { Dataset, Datum, Measures, VSeed } from 'src/types'

/**
 * @description 获取指标, 无指标时, 自动生成指标
 * @param vseed vseed
 * @returns 指标
 */
export const getBasicMeasures = (vseed: VSeed): Measures => {
  const { dataset, measures } = vseed

  // 无指标时, 自动生成指标
  if (!measures || measures.length === 0) {
    return generateMeasuresByDataset(dataset)
  }

  return measures
}

/**
 * @description 自动根据数据集生成指标
 * @param dataset 数据集
 * @returns 
 */
export const generateMeasuresByDataset = (dataset: Dataset) => {
  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return []
  }

  const top100dataset = dataset.slice(0, 100)

  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})

  const basicMeasures = Object.keys(sample)
    .filter((key) => {
      return top100dataset.some((item) => typeof item[key] === 'number') && !['', null, undefined].includes(key)
    })
    .map((measure) => ({
      id: measure,
      alias: measure,
    }))

  return basicMeasures
}

/**
 * @description 检查是否为指标树, 指标树深度大于1. 如果存在一个指标为组, 即有children配置, 则认为是指标树.
 * @param vseed vseed
 * @returns
 */
export const isMeasureTreeWithChildren = (vseed: VSeed) => {
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
export const isMeasureTreeWithParentId = (vseed: VSeed) => {
  const { measures } = vseed

  if (!measures) {
    return false
  }

  return measures.some((measure) => 'parentId' in measure)
}
