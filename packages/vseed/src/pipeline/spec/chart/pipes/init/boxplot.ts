import { type IBoxPlotChartSpec } from '@visactor/vchart'
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
import { isPivotChart, revisedBoxPlotFieldKey } from 'src/pipeline/utils'

export const initBoxplot: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IBoxPlotChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { unfoldInfo, id } = datasetReshapeInfo[0]

  const usePivotChart = isPivotChart(vseed)
  result.type = 'boxPlot'
  // 默认应该是盒须的位置
  result.minField = revisedBoxPlotFieldKey(LowerWhisker, id, usePivotChart)
  result.maxField = revisedBoxPlotFieldKey(UpperWhisker, id, usePivotChart)
  result.q1Field = revisedBoxPlotFieldKey(Q1MeasureValue, id, usePivotChart)
  result.medianField = revisedBoxPlotFieldKey(MedianMeasureId, id, usePivotChart)
  result.q3Field = revisedBoxPlotFieldKey(Q3MeasureValue, id, usePivotChart)
  result.outliersField = revisedBoxPlotFieldKey(OutliersMeasureId, id, usePivotChart)
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
