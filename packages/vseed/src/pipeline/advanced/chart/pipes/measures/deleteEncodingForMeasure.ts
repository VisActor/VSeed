import { deleteMeasureTreeByCallback } from 'src/pipeline/utils'
import type { AdvancedPipe, Measure } from 'src/types'

export const deleteEncodingForMeasure = (encodingKeys: string[]): AdvancedPipe => {
  return (advancedVSeed) => {
    const deleteBy = (measure: Measure) => encodingKeys.includes(measure.encoding as string)

    const measureTree = deleteMeasureTreeByCallback(advancedVSeed.measures, deleteBy)

    return {
      ...advancedVSeed,
      measures: measureTree,
    }
  }
}
