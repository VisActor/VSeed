import type { IFunnelChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const funnelStyle: VChartSpecPipe = (spec) => {
  const result = {
    ...spec,
    funnel: {
      style: {},
    },
  } as IFunnelChartSpec

  return {
    ...result,
    funnel: {
      style: {
        cornerRadius: 0,
      },
      state: {
        hover: {
          fillOpacity: 0.6,
        },
      },
    },
  }
}
