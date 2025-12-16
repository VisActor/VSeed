import type { AdvancedPipe, Dimension, Dimensions } from 'src/types'

export const pickDimensionsForReshape: AdvancedPipe = (advancedVSeed) => {
  const deleteBy = (dimension: Dimension) => dimension.encoding === 'tooltip' || dimension.encoding === 'label'
  const reshapeDimensions: Dimensions = []
  ;(advancedVSeed.dimensions ?? []).forEach((d) => {
    if (!deleteBy(d)) {
      reshapeDimensions.push(d)
    }
  })

  return {
    ...advancedVSeed,
    reshapeDimensions,
  }
}
