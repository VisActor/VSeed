import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initColumn: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed

  if (!encoding[0].y || !encoding[0].x || !encoding[0].group) {
    return result
  }

  result.type = 'bar'
  result.direction = 'vertical'
  result.xField = encoding[0].x[0]
  result.yField = encoding[0].y[0]
  result.seriesField = encoding[0].group[0]
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true
  return result
}
