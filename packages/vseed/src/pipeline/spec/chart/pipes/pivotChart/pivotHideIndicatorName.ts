import type { PivotChartSpecPipe } from 'src/types'

export const pivotHideIndicatorName: PivotChartSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed

  return {
    ...spec,
    hideIndicatorName: datasetReshapeInfo.length <= 1,
  }
}
