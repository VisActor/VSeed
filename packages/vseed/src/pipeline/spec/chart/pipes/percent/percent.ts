import type { IAreaChartSpec, IBarChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const percent: VChartSpecPipe = (spec) => {
  const result = { ...spec } as IAreaChartSpec | IBarChartSpec
  result.percent = true
  return result
}
