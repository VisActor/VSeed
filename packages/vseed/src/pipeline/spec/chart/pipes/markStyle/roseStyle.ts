import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const roseStyle: SpecPipe<Spec> = (spec, context) => {
  const { advancedVSeed } = context
  const { dataset } = advancedVSeed
  const showStroke = dataset.length <= 30

  const result = {
    ...spec,
    rose: {
      style: {},
    },
  } as Required<IRoseChartSpec>

  return {
    ...result,
    rose: {
      style: {
        stroke: '#ffffff',
        lineWidth: showStroke ? 1 : 0,
      },
      state: {
        hover: {
          lineWidth: 1,
          fillOpacity: 0.6,
        },
      },
    },
  }
}
