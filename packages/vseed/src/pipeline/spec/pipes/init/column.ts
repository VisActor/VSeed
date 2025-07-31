import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initColumn: SpecPipe = (spec) => {
  const result = { ...spec } as IBarChartSpec
  result.type = 'bar'
  return result
}
