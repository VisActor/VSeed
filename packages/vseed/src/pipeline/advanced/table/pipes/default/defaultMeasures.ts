import { clone } from 'remeda'
import { isMeasure, preorderTraverse } from 'src/pipeline/utils'
import type { AdvancedPipe, Datum, Measure } from 'src/types'

/**
 * @description 如果用户没有配置 measures, 则基于 dataset 构建默认的 measures
 */
export const defaultMeasures: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { measures, dataset } = vseed

  if (measures && measures.length > 0) {
    const clonedMeasures = clone(measures)
    preorderTraverse(clonedMeasures, (node) => {
      if (isMeasure(node as Measure)) {
        ;(node as Measure).alias = (node as Measure).alias || (node as Measure).id
      }
      return false
    })
    return {
      ...advancedVSeed,
      measureTree: clonedMeasures,
    }
  }

  const top100dataset = dataset.slice(0, 100)
  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})
  const defaultMeasures = Object.keys(sample)
    .filter((key) => {
      return top100dataset.some((item) => typeof item[key] === 'number') && !['', null, undefined].includes(key)
    })
    .map((measure) => ({
      id: measure,
      alias: measure,
    }))

  return {
    ...advancedVSeed,
    measureTree: defaultMeasures,
  }
}
