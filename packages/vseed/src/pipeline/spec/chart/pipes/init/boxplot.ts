import type { IBoxPlotChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isDeepEqual } from 'remeda'
import {
  LowerWhisker,
  MeasureId,
  MedianMeasureId,
  OutliersMeasureId,
  Q1MeasureValue,
  Q3MeasureValue,
  UpperWhisker,
} from 'src/dataReshape/constant'

export const initBoxplot: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IBoxPlotChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]

  result.type = 'boxPlot'
  // 默认应该是盒须的位置
  result.minField = LowerWhisker
  result.maxField = UpperWhisker
  result.q1Field = Q1MeasureValue
  result.medianField = MedianMeasureId
  result.q3Field = Q3MeasureValue
  result.outliersField = OutliersMeasureId
  result.xField = [unfoldInfo.encodingX]
  result.seriesField = unfoldInfo.encodingColorId

  const sameDimensionsMode = isDeepEqual(encoding.x, encoding.color)

  if (!sameDimensionsMode) {
    result.xField.push(unfoldInfo.encodingColor)

    if (encoding.color?.[0] === MeasureId && encoding.value?.length === 1) {
      result.xField.pop()
    }
  }

  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true
  return result
}
