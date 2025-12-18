import type { ISpec } from '@visactor/vchart'
import { isPivotChart } from 'src/pipeline/utils'
import type { DualAxisOptions, VChartSpecPipe } from 'src/types'

export const datasetDualAxis = (options: DualAxisOptions): VChartSpecPipe => {
  return (spec, context) => {
    const { advancedVSeed, vseed } = context
    const { analysis, datasetReshapeInfo } = advancedVSeed
    const orderMapping = analysis?.orderMapping || {}

    const { unfoldInfo } = datasetReshapeInfo[0]
    const x = unfoldInfo.encodingX
    const colorId = unfoldInfo.encodingColorId
    const id = datasetReshapeInfo[0].id
    const fields: Record<string, object> = {}

    if (x) {
      const order = orderMapping[x]
      if (order) {
        fields[x] = {
          sortIndex: 0,
          domain: order,
          lockStatisticsByDomain: true,
        }
      } else {
        fields[x] = {
          sortIndex: 0,
        }
      }
    }
    if (colorId) {
      const order = orderMapping[colorId]
      if (order) {
        fields[colorId] = {
          sortIndex: 0,
          domain: order,
          lockStatisticsByDomain: true,
        }
      } else {
        fields[colorId] = {
          sortIndex: 0,
        }
      }
    }

    return {
      ...spec,
      data: {
        id: `${id}-${options.axisType}-${options.chartType}`,
        // 透视表不使用 dataValues
        values: isPivotChart(vseed) ? undefined : advancedVSeed.dataset,
        fields: fields,
      },
    } as ISpec
  }
}
