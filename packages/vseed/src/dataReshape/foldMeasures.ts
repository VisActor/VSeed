/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dataset, FoldInfo, Dimension } from 'src/types'
import { ColorEncoding, ColorIdEncoding, ORIGINAL_DATA } from './constant'
import { omit } from 'remeda'

/**
 * 折叠指定的指标
 * @description 合并指定的指标为1个, 无论多少个, 都能转换为1个, 取名为fold, 意为折叠后混合在一起.
 */
export const foldMeasures = (
  dataset: Dataset,
  measures: Dimension[],
  options: {
    measureId: string
    measureName: string
    measureValue: string
    colorMeasureId?: string
  },
): {
  dataset: Dataset
  foldInfo: FoldInfo
} => {
  const { measureId, measureName, measureValue, colorMeasureId } = options || {}

  const foldInfo: FoldInfo = {
    measureId,
    measureName,
    measureValue,
    colorRange: [0, 1],
    measureRange: [0, 1],
    foldMap: {},
  }
  const result: Dataset = new Array(dataset.length * measures.length) as Dataset
  let index = 0
  const ids = measures.map((d) => d.id)
  for (let i = 0; i < dataset.length; i++) {
    for (let j = 0; j < measures.length; j++) {
      const datum: Record<string, any> = omit({ ...dataset[i] }, ids)

      datum[ORIGINAL_DATA] = dataset[i]

      const measure = measures[j]
      const { id, alias } = measure

      datum[id] = dataset[i][id] as unknown
      datum[measureId] = id
      datum[measureName] = alias || id
      datum[measureValue] = dataset[i][id] as unknown

      if (colorMeasureId) {
        const value = (datum[ORIGINAL_DATA] as Record<string, string | number>)[colorMeasureId]
        datum[ColorEncoding] = value
        datum[ColorIdEncoding] = colorMeasureId

        foldInfo.colorRange = [
          Math.min(foldInfo.colorRange[0] || Infinity, Number(value)),
          Math.max(foldInfo.colorRange[1] || -Infinity, Number(value)),
        ]
      }

      foldInfo.measureRange = [
        Math.min(foldInfo.measureRange[0] || Infinity, Number(datum[id])),
        Math.max(foldInfo.measureRange[1] || -Infinity, Number(datum[id])),
      ]

      foldInfo.foldMap[id] = alias
      result[index++] = datum
    }
  }

  return {
    dataset: result,
    foldInfo,
  }
}
