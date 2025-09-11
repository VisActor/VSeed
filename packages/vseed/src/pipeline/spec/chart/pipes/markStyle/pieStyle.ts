import type { IPieChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const pieStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { dataset } = advancedVSeed
  const showStroke = dataset.length <= 30

  const result = {
    ...spec,
    pie: {
      style: {},
    },
  } as Required<IPieChartSpec>

  return {
    ...result,
    pie: {
      style: {
        stroke: '#ffffff',
        lineWidth: showStroke ? 1 : 0,
      },
      state: {
        hover: {
          outerRadius: result.outerRadius * 1.1,
        },
      },
    },
  }
}
