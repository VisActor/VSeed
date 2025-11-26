import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { Dimensions, PivotChartSpecPipe } from 'src/types'

export const pivotRowDimensions: PivotChartSpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
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
