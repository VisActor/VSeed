import type { IAreaChartSpec, IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const stackInverse: SpecPipe = (spec) => {
  const result = { ...spec } as IAreaChartSpec | IBarChartSpec
  result.stackInverse = true
  return result
}
