import type { PivotTableConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const initPivotTable: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { dataset } = advancedVSeed

  return {
    ...spec,
    records: dataset,
    widthMode: 'standard',
    heightMode: 'autoHeight',
    autoWrapText: true,
    columnResizeMode: 'all',
  } as PivotTableConstructorOptions
}
