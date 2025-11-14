import type { IHistogramChartSpec } from '@visactor/vchart'
import { BinEndMeasureId, BinStartMeasureId, FoldMeasureValue } from 'src/index'
import type { VChartSpecPipe } from 'src/types'

export const initHistogram: VChartSpecPipe = (spec) => {
  const result = { ...spec } as IHistogramChartSpec

  // 直方图默认支持明细数据
  result.type = 'histogram'
  result.xField = BinStartMeasureId
  result.x2Field = BinEndMeasureId
  result.yField = FoldMeasureValue
  // result.seriesField = unfoldInfo.encodingColorId
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.legends = {
    visible: false,
  }
  result.barGap = 2
  result.animation = true
  return result
}
