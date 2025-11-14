import type { PivotChartSpecPipe } from 'src/types'

export const datasetPivot: PivotChartSpecPipe = (spec, context) => {
  const result = { ...spec }
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
  }
}
