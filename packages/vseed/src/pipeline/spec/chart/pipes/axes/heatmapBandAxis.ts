import type { ISpec } from '@visactor/vchart'
import type { VChartSpecPipe, XBandAxis, YBandAxis } from 'src/types'
import { bandAxisStyle } from './bandAxisStyle'

export const heatmapBandAxis: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const xAxisConfig = (advancedVSeed.config?.[chartType as 'heatmap']?.xAxis ?? {}) as XBandAxis
  const yAxisConfig = (advancedVSeed.config?.[chartType as 'heatmap']?.yAxis ?? {}) as YBandAxis
  const xBandAxis = bandAxisStyle(xAxisConfig)
  const yBandAxis = bandAxisStyle(yAxisConfig)

  xBandAxis.orient = 'bottom'
  xBandAxis.bandPadding = 0
  yBandAxis.orient = 'left'
  yBandAxis.bandPadding = 0

  result.axes = [xBandAxis, yBandAxis]

  return result
}
