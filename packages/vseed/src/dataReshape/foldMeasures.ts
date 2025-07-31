/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Dataset, Measure, Measures } from 'src/types'

/**
 * 折叠指定的指标
 * @description 合并指定的指标为1个, 无论多少个, 都能转换为1个, 取名为fold, 意为折叠后混合在一起.
 */
export const foldMeasures = (
  dataset: Dataset,
  measures: Required<Measure[]>,
  measureId = '__MeaId__',
  measureName = '__MeaName__',
  measureValue = '__MeaValue__',
) => {
  const newDataset = dataset.map((datum) => {
    measures.forEach((measure) => {
      const { id, alias } = measure
      datum[measureId] = id
      datum[measureName] = alias
      datum[measureValue] = datum[id]
    })
  })

  return {
    dataset: newDataset,
  }
}

/**
 * 折叠指定的指标组, 至多支持2层
 * @param dataset
 * @param measures
 * @param measureId
 * @param measureName
 * @param measureValue
 * @returns
 */
export const foldMeasureGroups = (
  dataset: Dataset,
  measures: Required<Measures>,
  measureId = '__MeaId__',
  measureName = '__MeaName__',
  measureValue = '__MeaValue__',
) => {
  const groups: Array<Measures> = []
  if (!measures) {
    return {
      dataset,
    }
  }

  // 没有分组, 直接折叠所有指标
  if (!measures.some((measure) => 'children' in measure)) {
    return foldMeasures(dataset, measures, measureId, measureName, measureValue)
  }

  measures.forEach((measure) => {
    if ('children' in measure && measure.children) {
      groups.push(measure.children)
    } else {
      groups.push([measure])
    }
  })

  // 一组返回一个dataset
  const datasetGroup = groups.map((measures) => {
    if (!measures) {
      return []
    }
    return foldMeasures(dataset, measures, measureId, measureName, measureValue)
  })

  return {
    datasetGroup,
  }
}
