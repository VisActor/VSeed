import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { Dimensions, Spec, SpecPipe } from 'src/types'

export const pivotColumnDimensions: SpecPipe = (spec, context): Partial<Spec> => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensions as Dimensions

  if (!dimensions) {
    return result
  }
  const columnDimensions = dimensions.filter((dim) => dim.encoding === 'column')
  const columns = columnDimensions.map((dim) => ({
    dimensionKey: dim.id,
    title: dim.alias || dim.id,
  })) as unknown

  return {
    ...result,
    columns: columns,
  } as PivotChartConstructorOptions
}
