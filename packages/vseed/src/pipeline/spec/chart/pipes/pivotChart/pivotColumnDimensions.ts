import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { FoldXMeasureId } from 'src/dataReshape'
import type { Dimensions, PivotChartSpecPipe } from 'src/types'

export const pivotColumnDimensions: PivotChartSpecPipe = (spec, context): Partial<PivotChartConstructorOptions> => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensions as Dimensions
  const measures = advancedVSeed.measures ?? []

  if (!dimensions) {
    return result
  }
  const columnDimensions = dimensions.filter((dim) => dim.encoding === 'column')
  const columns = columnDimensions.map((dim) => {
    const baseConfig: any = {
      dimensionKey: dim.id,
      title: dim.alias ?? dim.id,
    }

    if (dim.id === FoldXMeasureId) {
      baseConfig.headerFormat = (title: string) => {
        const measure = measures.find((m) => m.id === title)

        return measure ? (measure.alias ?? measure.id) : title
      }
    }

    return baseConfig
  }) as unknown

  return {
    ...result,
    columns: columns,
  } as Partial<PivotChartConstructorOptions>
}
