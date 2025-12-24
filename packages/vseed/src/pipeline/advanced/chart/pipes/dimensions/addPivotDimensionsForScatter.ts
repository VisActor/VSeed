import { FoldXMeasureId, FoldYMeasureId } from 'src/dataReshape/constant'
import type { AdvancedPipe, Dimensions } from 'src/types'

export const addPivotDimensionsForScatter: AdvancedPipe = (advancedVSeed) => {
  const { reshapeMeasures = [] } = advancedVSeed

  if (reshapeMeasures[0]?.length >= 2) {
    const dimensions = advancedVSeed.dimensions as Dimensions
    const xMeasures = reshapeMeasures[0].filter((m) => m.encoding === 'xAxis')
    const yMeasures = reshapeMeasures[0].filter((m) => m.encoding === 'yAxis')

    if (xMeasures.length > 1) {
      dimensions.push({
        id: FoldXMeasureId,
        alias: ' ',
        encoding: 'column',
      })
    }

    if (yMeasures.length > 1) {
      dimensions.push({
        id: FoldYMeasureId,
        alias: ' ',
        encoding: 'row',
      })
    }

    return {
      ...advancedVSeed,
      dimensions,
    }
  }

  return advancedVSeed
}
