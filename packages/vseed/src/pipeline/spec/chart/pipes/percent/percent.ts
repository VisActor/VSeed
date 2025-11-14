import type { IAreaChartSpec, IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const percent: SpecPipe<Spec> = (spec) => {
  const result = { ...spec } as IAreaChartSpec | IBarChartSpec
  result.percent = true
  return result
}
