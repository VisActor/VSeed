import type { Dimensions, SpecPipe } from 'src/types'

export const pivotRows: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensions as Dimensions
  const rows = dimensions.filter((item) => item['location'] === 'rowDimension')

  return {
    ...spec,
    rows: rows.map((item) => {
      return {
        dimensionKey: item.id,
        title: item.alias || item.id,
        width: 'auto',
      }
    }),
  }
}
