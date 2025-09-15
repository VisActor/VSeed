import { deleteDimensionTreeByCallback } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension } from 'src/types'

export const deleteTooltipAndLabelDimension: AdvancedPipe = (advancedVSeed) => {
  const deleteBy = (dimension: Dimension) => dimension.encoding === 'tooltip' || dimension.encoding === 'label'

  const dimensionTree = deleteDimensionTreeByCallback(advancedVSeed.dimensions, deleteBy)

  return {
    ...advancedVSeed,
    dimensions: dimensionTree,
  }
}
