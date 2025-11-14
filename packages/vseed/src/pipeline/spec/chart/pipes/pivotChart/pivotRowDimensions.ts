import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { Dimensions, SpecPipe } from 'src/types'

export const pivotRowDimensions: SpecPipe<PivotChartConstructorOptions> = (
  spec,
  context,
): Partial<PivotChartConstructorOptions> => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensions as Dimensions
  if (!dimensions) {
    return result
  }
  const rowDimensions = dimensions.filter((dim) => dim.encoding === 'row')
  const rows = rowDimensions.map((dim) => ({
    dimensionKey: dim.id,
    title: dim.alias || dim.id,
  }))
  return {
    ...result,
    rows: rows,
  } as Partial<PivotChartConstructorOptions>
}
