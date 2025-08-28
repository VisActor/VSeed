import type { Dimension, DimensionGroup } from 'src/types'

export const isDimension = (dimension: Dimension | DimensionGroup): dimension is Dimension => {
  return !('children' in dimension)
}

export const isDimensionGroup = (dimension: Dimension | DimensionGroup): dimension is DimensionGroup => {
  return 'children' in dimension
}

export const isDimensions = (dimensions: Dimension[] | DimensionGroup[]): dimensions is Dimension[] => {
  return dimensions.every(isDimension)
}
