import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const pivotHideIndicatorName: SpecPipe<PivotChartConstructorOptions> = (spec) => {
  return {
    ...spec,
    hideIndicatorName: true,
  }
}
