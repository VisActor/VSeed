import type { IAreaChartSpec, IBarChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const stackInverse: VChartSpecPipe = (spec) => {
  const result = { ...spec } as IAreaChartSpec | IBarChartSpec
  result.stackInverse = true
  return result
}
