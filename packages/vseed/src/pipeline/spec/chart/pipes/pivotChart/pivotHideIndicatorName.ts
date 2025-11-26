import type { PivotChartSpecPipe } from 'src/types'

export const pivotHideIndicatorName: PivotChartSpecPipe = (spec) => {
  return {
    ...spec,
    hideIndicatorName: true,
  }
}
