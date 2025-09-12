import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { IBasicDimension } from '@visactor/vtable/es/ts-types/pivot-table/dimension/basic-dimension'
import type { Dimensions, SpecPipe } from 'src/types'

export const pivotColumnDimensions: SpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensions as Dimensions

  if (!dimensions) {
    return result
  }
  const columnDimensions = dimensions.filter((dim) => dim.location === 'columnDimension' && dim.encoding === 'column')
  const columns: IBasicDimension[] = columnDimensions.map((dim) => ({
    dimensionKey: dim.id,
    title: dim.alias || dim.id,
  }))
  return {
    ...result,
    columns: columns,
  }
}
