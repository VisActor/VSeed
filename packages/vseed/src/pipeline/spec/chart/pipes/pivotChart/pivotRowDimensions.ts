import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { IBasicDimension } from '@visactor/vtable/es/ts-types/pivot-table/dimension/basic-dimension'
import type { Dimensions, SpecPipe } from 'src/types'

export const pivotRowDimensions: SpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensions as Dimensions
  if (!dimensions) {
    return result
  }
  const rowDimensions = dimensions.filter((dim) => dim.encoding === 'row')
  const rows: IBasicDimension[] = rowDimensions.map((dim) => ({
    dimensionKey: dim.id,
    title: dim.alias || dim.id,
  }))
  return {
    ...result,
    rows: rows,
  }
}
