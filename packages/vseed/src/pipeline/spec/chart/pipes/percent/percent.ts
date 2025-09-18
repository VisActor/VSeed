import type { IAreaChartSpec, IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const percent: SpecPipe = (spec) => {
  const result = { ...spec } as IAreaChartSpec | IBarChartSpec
  result.percent = true
  return result
}
