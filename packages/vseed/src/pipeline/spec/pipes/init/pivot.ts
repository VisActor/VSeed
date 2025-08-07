import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const initPivot: SpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions

  return {
    ...result,
    rows: [],
    columns: [],
    indicators: [],
    records: [],
    widthMode: 'adaptive',
    heightMode: 'adaptive',
    indicatorsAsCol: false,
  }
}
