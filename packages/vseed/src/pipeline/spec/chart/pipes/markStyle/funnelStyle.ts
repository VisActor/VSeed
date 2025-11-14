import type { IFunnelChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const funnelStyle: SpecPipe<Spec> = (spec) => {
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
