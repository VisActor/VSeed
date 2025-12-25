import { FoldXMeasureId, FoldYMeasureId } from 'src/dataReshape/constant'
import type { AdvancedPipe, Dimensions, Measure } from 'src/types'

export const addPivotDimensionsForScatter: AdvancedPipe = (advancedVSeed) => {
  const { reshapeMeasures = [] } = advancedVSeed

  if (reshapeMeasures[0]?.length >= 2) {
    const dimensions = (advancedVSeed.dimensions ?? []) as Dimensions
    const xMeasures = reshapeMeasures[0].filter((m: Measure) => m.encoding === 'xAxis')
    const yMeasures = reshapeMeasures[0].filter((m: Measure) => m.encoding === 'yAxis')

    if (xMeasures.length > 1 || yMeasures.length > 1) {
      dimensions.push({
        id: FoldXMeasureId,
        alias: ' ',
        encoding: 'column',
      })
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
