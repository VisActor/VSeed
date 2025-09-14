import { clone } from 'remeda'
import type { AdvancedPipe, Datum } from 'src/types'

/**
 * @description 如果用户没有配置 measures, 则基于 dataset 构建默认的 measures
 */
export const defaultMeasures: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { measures, dataset } = vseed

  if (measures && measures.length > 0) {
    return {
      ...advancedVSeed,
      measures: clone(measures),
    }
  }

  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return {
      ...advancedVSeed,
      measures: [],
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
    measures: defaultMeasures,
  }
}
