import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const datasetPivot: SpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const { dataset, datasetReshapeInfo } = advancedVSeed
  const records = dataset.reduce((pre, cur, index) => {
    const id = datasetReshapeInfo[index].id
    pre[id] = cur
    return pre
  }, {})
  return {
    ...result,
    records: records,
  } as PivotChartConstructorOptions
}
