import type { IRadarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initRadar: SpecPipe = (spec, context) => {
  const result = { ...spec } as IRadarChartSpec
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed

  if (!encoding[0].angle || !encoding[0].radius || !encoding[0].group) {
    return result
  }

  result.type = 'radar'
  result.angleField = encoding[0].angle[0]
  result.radiusField = encoding[0].radius[0]
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
