import type { AdvancedPipe, MeasureEncoding, ScatterMeasure } from 'src/types'
import { clone } from 'remeda'
import { isCommonMeasureEncoding } from './utils'

export const buildMeasuresForScatter: AdvancedPipe = (advancedVSeed) => {
  const { measures = [] } = advancedVSeed
  const encodedMeasures: ScatterMeasure[] = []

  for (let index = 0; index < measures.length; index++) {
    const item = measures[index]
    const encoding = item.encoding
    const isYAxis = encoding === 'yAxis'
    const isXAxis = encoding === 'xAxis'
    const isOtherEncoding = item.encoding && isCommonMeasureEncoding(encoding as MeasureEncoding)

    if (isYAxis) {
      encodedMeasures.push(item as ScatterMeasure)
    } else if (isXAxis) {
      encodedMeasures.push(item as ScatterMeasure)
    } else if (!isOtherEncoding && encoding !== 'size') {
      const xCount = encodedMeasures.filter((m) => m.encoding === 'xAxis').length
      item.encoding = xCount === 0 ? 'xAxis' : 'yAxis'
      encodedMeasures.push(item as ScatterMeasure)
    }
  }

  const xCount = encodedMeasures.filter((m) => m.encoding === 'xAxis').length
  const yCount = encodedMeasures.filter((m) => m.encoding === 'yAxis').length

  if (yCount === 0 && xCount > 0) {
    const cloneMeasure = clone(encodedMeasures[0])
    cloneMeasure.encoding = 'yAxis'
    encodedMeasures.push(cloneMeasure)
  }

  advancedVSeed.reshapeMeasures = encodedMeasures.length > 0 ? [encodedMeasures] : []

  return advancedVSeed
}
