import { deleteMeasureTreeByCallback } from 'src/pipeline/utils'
import type { AdvancedPipe, Measure } from 'src/types'

export const deleteTooltipMeasure: AdvancedPipe = (advancedVSeed) => {
  const deleteBy = (measure: Measure) => measure.encoding === 'tooltip'

  const measureTree = deleteMeasureTreeByCallback(advancedVSeed.measures, deleteBy)

  return {
    ...advancedVSeed,
    measures: measureTree,
  }
}
