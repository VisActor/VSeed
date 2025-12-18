import type { IBarSeriesSpec, ILineSeriesSpec } from '@visactor/vchart'
import type { DualAxisOptions, VChartSpecPipe } from 'src/types'
import { isLinearColor } from '../color/colorAdapter'

export const initDualAxis = (options: DualAxisOptions): VChartSpecPipe => {
  return (spec, context) => {
    const result = { ...spec } as IBarSeriesSpec | ILineSeriesSpec
    const { advancedVSeed, vseed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo, id } = datasetReshapeInfo[0]

    result.id = `${id}-${options.axisType}-${options.chartType}`
    result.type = options.chartType === 'line' ? 'line' : 'bar'
    result.direction = 'vertical'
    result.xField = unfoldInfo.encodingX
    result.seriesField = isLinearColor(advancedVSeed, vseed) ? unfoldInfo.encodingDetail : unfoldInfo.encodingColorId

    result.yField = options.foldInfo.measureValue

    result.animation = true

    return result
  }
}
