import type { Dataset, FoldInfo, Measures } from 'src/types'
import { ColorEncoding, ColorIdEncoding, ORIGINAL_DATA } from './constant'
import { omit } from 'remeda'

/**
 * 折叠指定的指标
 * @description 合并指定的指标为1个, 无论多少个, 都能转换为1个, 取名为fold, 意为折叠后混合在一起.
 */
export const foldMeasures = (
  dataset: Dataset,
  measures: Measures,
  options: {
    measureId: string
    measureName: string
    measureValue: string
    colorMeasureId?: string
    allowEmptyFold?: boolean
    omitIds?: string[]
  },
): {
  dataset: Dataset
  foldInfo: FoldInfo
} => {
  const { measureId, measureName, measureValue, colorMeasureId, allowEmptyFold = true, omitIds = [] } = options || {}

  const foldInfo: FoldInfo = {
    measureId,
    measureName,
    measureValue,
    statistics: {
      max: -Infinity,
      min: Infinity,
      sum: 0,
      count: 0,
      colorMin: Infinity,
      colorMax: -Infinity,
    },
    foldMap: {},
  }

  if (!allowEmptyFold && measures.length === 0) {
    return {
      dataset,
      foldInfo,
    }
  }

  const result: Dataset = new Array(dataset.length * measures.length) as Dataset
  let index = 0
  // const ids = measures.map((d) => d.id)
  for (let i = 0; i < dataset.length; i++) {
    for (let j = 0; j < measures.length; j++) {
      const datum: Record<string, any> = omit({ ...dataset[i] }, omitIds)

      datum[ORIGINAL_DATA] = dataset[i]

      const measure = measures[j]
      const { id, alias } = measure

      datum[id] = dataset[i][id] as unknown
      datum[measureId] = id
      datum[measureName] = alias || id
      datum[measureValue] = dataset[i][id] as unknown

      const valueNumber = Number(datum[id])
      foldInfo.statistics.min = Math.min(foldInfo.statistics.min, valueNumber)
      foldInfo.statistics.max = Math.max(foldInfo.statistics.max, valueNumber)
      foldInfo.statistics.sum += valueNumber
      foldInfo.statistics.count++

      if (measure.encoding === 'color') {
        foldInfo.statistics.colorMin = foldInfo.statistics.min
        foldInfo.statistics.colorMax = foldInfo.statistics.max
        datum[ColorEncoding] = valueNumber
        datum[ColorIdEncoding] = measure.id
      } else if (colorMeasureId) {
        const value = (datum[ORIGINAL_DATA] as Record<string, string | number>)[colorMeasureId]
        datum[ColorEncoding] = value
        datum[ColorIdEncoding] = colorMeasureId

        const valueNumber = Number(value)
        foldInfo.statistics.colorMin = Math.min(foldInfo.statistics.colorMin, valueNumber)
        foldInfo.statistics.colorMax = Math.max(foldInfo.statistics.colorMax, valueNumber)
      }

      foldInfo.foldMap[id] = alias
      result[index++] = datum
    }
  }

  return {
    dataset: result,
    foldInfo,
  }
}
