import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initColumn: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed
  result.type = 'bar'
  result.direction = 'vertical'
  result.xField = encoding[0].x?.[0]
  result.yField = encoding[0].y?.[0]
  result.seriesField = encoding[0].group?.[0]
  result.data = {
    values: advancedVSeed.dataset,
  }
  return result
}
