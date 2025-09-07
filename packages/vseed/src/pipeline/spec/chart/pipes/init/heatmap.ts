import type { IHeatmapChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initHeatmap: SpecPipe = (spec, context) => {
  const result = { ...spec } as IHeatmapChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed

  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  result.type = 'heatmap'
  result.direction = 'vertical'
  result.xField = unfoldInfo.encodingX
  result.yField = unfoldInfo.encodingY
  result.seriesField = unfoldInfo.encodingColor
  result.valueField = foldInfo.measureValue
  result.padding = 0
  result.cell = {
    style: {
      shape: 'rect',
      stroke: '#ffffff',
      lineWidth: 1,
      // fill: {
      //   field: encoding[0].color[0],
      //   scale: 'color',
      // },
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
