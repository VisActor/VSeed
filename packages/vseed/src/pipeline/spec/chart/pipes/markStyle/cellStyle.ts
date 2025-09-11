import type { IHeatmapChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const cellStyle: SpecPipe = (spec) => {
  const result = {
    ...spec,
    cell: {
      style: {},
    },
  } as IHeatmapChartSpec

  return {
    ...result,
    cell: {
      style: {
        shape: 'rect',
        stroke: '#ffffff',
        lineWidth: 1,
      },
    },
  }
}
