import { IAreaChartSpec, IBarChartSpec } from '@visactor/vchart'
import { SpecPipe } from 'src/types'

export const stack: SpecPipe = (spec, context) => {
  const result = { ...spec } as IAreaChartSpec | IBarChartSpec
  result.stack = true
  return result
}
