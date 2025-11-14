import type { PivotTableConstructorOptions } from '@visactor/vtable'
import type { Dimensions, PivotTableSpecPipe } from 'src/types'

export const pivotColumns: PivotTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed
  const dimensions = advancedVSeed.dimensions as Dimensions
  const columns = dimensions.filter((item) => encoding.column?.includes(item.id))

  return {
    ...spec,
    columns: columns.map((item) => {
      return {
        dimensionKey: item.id,
        title: item.alias || item.id,
        width: 'auto',
      }
    }),
  } as PivotTableConstructorOptions
}
