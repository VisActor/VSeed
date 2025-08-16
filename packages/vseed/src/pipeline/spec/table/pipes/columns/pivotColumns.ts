import type { Dimensions, SpecPipe } from 'src/types'

export const pivotColumns: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensions as Dimensions
  const columns = dimensions.filter((item) => item['location'] === 'columnDimension')

  return {
    ...spec,
    columns: columns.map((item) => {
      return {
        dimensionKey: item.id,
        title: item.alias || item.id,
        width: 'auto',
      }
    }),
  }
}
