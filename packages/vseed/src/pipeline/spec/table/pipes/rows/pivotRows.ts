import type { Dimensions, SpecPipe } from 'src/types'

export const pivotRows: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensions as Dimensions
  const { encoding } = advancedVSeed
  const rows = dimensions.filter((item) => encoding.row?.includes(item.id))

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
