import type { IAreaChartSpec, IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const stackInverse: SpecPipe<Spec> = (spec) => {
  const result = { ...spec } as IAreaChartSpec | IBarChartSpec
  result.stackInverse = true
  return result
}
