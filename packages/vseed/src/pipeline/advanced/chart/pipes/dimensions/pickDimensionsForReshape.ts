import { clone } from 'remeda'
import { deleteDimensionTreeByCallback } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension } from 'src/types'

export const pickDimensionsForReshape: AdvancedPipe = (advancedVSeed) => {
  const deleteBy = (dimension: Dimension) => dimension.encoding === 'tooltip' || dimension.encoding === 'label'
  const reshapeDimensions = clone(advancedVSeed.dimensions)
  deleteDimensionTreeByCallback(reshapeDimensions, deleteBy)

  return {
    ...advancedVSeed,
    reshapeDimensions,
  }
}
