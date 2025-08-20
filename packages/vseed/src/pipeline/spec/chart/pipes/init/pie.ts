import type { IPieChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initPie: SpecPipe = (spec, context) => {
  const result = { ...spec } as IPieChartSpec
  const { advancedVSeed } = context
  const { encoding, dataset } = advancedVSeed

  if (!encoding[0].angle || !encoding[0].radius || !encoding[0].group) {
    return result
  }

  const showStroke = dataset.length > 20

  result.type = 'pie'
  result.outerRadius = 0.8
  result.innerRadius = 0
  result.valueField = encoding[0].radius[0]
  result.categoryField = encoding[0].angle[0]
  result.seriesField = encoding[0].group[0]
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.pie = {
    style: {
      stroke: '#ffffff',
      lineWidth: showStroke ? 1 : 0,
      centerOffset: 0,
    },
    state: {
      hover: {
        centerOffset: 5,
        outerRadius: result.outerRadius * 1.1,
      },
    },
  }
  result.animation = true

  return result
}
