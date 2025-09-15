import { deleteMeasureTreeByCallback } from 'src/pipeline/utils'
import type { AdvancedPipe, Measure } from 'src/types'

export const deleteTooltipAndLabelMeasure: AdvancedPipe = (advancedVSeed) => {
  const deleteBy = (measure: Measure) => measure.encoding === 'tooltip' || measure.encoding === 'label'

  const measureTree = deleteMeasureTreeByCallback(advancedVSeed.measures, deleteBy)

  return {
    ...advancedVSeed,
    measures: measureTree,
  }
}
