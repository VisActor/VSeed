/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { PivotTableConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const titleOnDimension: SpecPipe<PivotTableConstructorOptions> = (spec) => {
  const { rows = [], columns = [] } = spec as any

  return {
    ...spec,
    corner: {
      titleOnDimension: (rows as any[]).length <= 1 && (columns as any[]).length >= 1 ? 'column' : 'row',
    },
  }
}
