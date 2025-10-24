import type { IHeatmapChartSpec } from '@visactor/vchart'
import { HideItemEncoding } from 'src/dataReshape/constant'
import type { SpecPipe } from 'src/types'

export const cellStyle: SpecPipe = (spec, context) => {
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
        visible: (datum) => {
          return datum[HideItemEncoding] !== true
        },
        shape: 'rect',
        stroke: cell?.stroke,
        lineWidth: cell?.lineWidth ?? 1,
      },
    },
  }
}
