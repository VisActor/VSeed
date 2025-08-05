import { IAreaChartSpec, IBarChartSpec } from '@visactor/vchart'
import { SpecPipe } from 'src/types'

export const percent: SpecPipe = (spec, context) => {
  const result = { ...spec } as IAreaChartSpec | IBarChartSpec
  result.percent = true
  return result
}
