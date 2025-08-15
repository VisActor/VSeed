import type { IFunnelChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initFunnel: SpecPipe = (spec, context) => {
  const result = { ...spec } as IFunnelChartSpec
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed

  if (!encoding[0].size || !encoding[0].group || !encoding[0].color) {
    return result
  }

  result.type = 'funnel'
  result.valueField = encoding[0].size[0]
  result.categoryField = encoding[0].group[0]
  result.padding = 0
  result.isTransform = true
  result.shape = 'rect'
  result.maxSize = '75%'
  result.minSize = '10%'
  result.region = [
    {
      clip: true,
    },
  ]
  result.funnel = {
    style: {
      cornerRadius: 4,
    },
    state: {
      hover: {
        fillOpacity: 0.6,
      },
    },
  }
  result.transformLabel = {
    visible: true,
  }

  result.animation = true

  return result
}
