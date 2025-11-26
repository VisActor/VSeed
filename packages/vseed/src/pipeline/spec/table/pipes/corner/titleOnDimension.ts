/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PivotTableSpecPipe } from 'src/types'

export const titleOnDimension: PivotTableSpecPipe = (spec) => {
  const { rows = [], columns = [] } = spec

  return {
    ...spec,
    corner: {
      titleOnDimension: (rows as any[]).length <= 1 && (columns as any[]).length >= 1 ? 'column' : 'row',
    },
  }
}
