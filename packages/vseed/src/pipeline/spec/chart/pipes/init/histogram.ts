import type { IHistogramChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initHistogram: SpecPipe = (spec) => {
  const result = { ...spec } as IHistogramChartSpec

  // 直方图默认支持明细数据
  result.type = 'histogram'
  result.xField = 'x0'
  result.x2Field = 'x1'
  result.yField = 'count'
  // result.seriesField = unfoldInfo.encodingColorId
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true
  return result
}
