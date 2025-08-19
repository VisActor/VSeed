import type { IHeatmapChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initHeatmap: SpecPipe = (spec, context) => {
  const result = { ...spec } as IHeatmapChartSpec
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed

  if (!encoding[0].y || !encoding[0].x || !encoding[0].color) {
    return result
  }

  result.type = 'heatmap'
  result.direction = 'vertical'
  result.xField = encoding[0].x[0]
  result.yField = encoding[0].y[0]
  result.valueField = encoding[0].color[0]
  result.padding = 0
  result.cell = {
    style: {
      shape: 'rect',
      stroke: '#ffffff',
      lineWidth: 1,
      fill: {
        field: encoding[0].color[0],
        scale: 'color',
      },
    },
  }
  result.axes = [
    {
      type: 'band',
      orient: 'left',
      bandPadding: 0,
    },
    {
      type: 'band',
      orient: 'bottom',
      bandPadding: 0,
    },
  ]
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true

  return result
}
