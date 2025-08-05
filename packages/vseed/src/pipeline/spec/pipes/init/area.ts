import type { IAreaChartSpec, IBarChartSpec, ILineChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initArea: SpecPipe = (spec, context) => {
  const result = { ...spec } as IAreaChartSpec
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed
  result.type = 'area'
  result.direction = 'vertical'
  result.xField = encoding[0].x?.[0]
  result.yField = encoding[0].y?.[0]
  result.seriesField = encoding[0].group?.[0]
  result.padding = 0
  return result
}
