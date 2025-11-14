import type { IHeatmapChartSpec } from '@visactor/vchart'
import { DATUM_HIDE_KEY } from 'src/pipeline/utils/constant'
import type { SpecPipe, Spec } from 'src/types'

export const cellStyle: SpecPipe<Spec> = (spec, context) => {
  const result = {
    ...spec,
    cell: {
      style: {},
    },
  } as IHeatmapChartSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const cell = advancedVSeed.config?.[chartType as 'heatmap']?.cell

  return {
    ...result,
    cell: {
      style: {
        visible: (datum: any) => {
          return datum?.[DATUM_HIDE_KEY] !== true
        },
        shape: 'rect',
        stroke: cell?.stroke,
        lineWidth: cell?.lineWidth ?? 1,
      },
    },
  }
}
