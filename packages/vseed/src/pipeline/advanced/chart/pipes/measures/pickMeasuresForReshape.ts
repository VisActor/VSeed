import { clone } from 'remeda'
import { deleteMeasureTreeByCallback } from 'src/index'
import type { AdvancedPipe, Measure } from 'src/types'

export const pickMeasuresForReshape = (encodingKeys: string[]): AdvancedPipe => {
  return (advancedVSeed) => {
    const clonedMeasures = clone(advancedVSeed.measures)

    const deleteBy = (measure: Measure) => encodingKeys.includes(measure.encoding as string)

    deleteMeasureTreeByCallback(clonedMeasures, deleteBy)

    return {
      ...advancedVSeed,
      reshapeMeasures: clonedMeasures,
    }
  }
}
