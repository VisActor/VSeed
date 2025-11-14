import { isPivotChart } from 'src/pipeline/utils'
import type { VChartSpecPipe } from 'src/types'
import type { ISpec } from '@visactor/vchart'

export const datasetBoxplot: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { id } = datasetReshapeInfo[0]

  const fields: Record<string, object> = {}

  return {
    ...spec,
    data: {
      id,
      // 透视表不使用 dataValues
      values: isPivotChart(vseed) ? undefined : advancedVSeed.dataset.flat(),
      fields: fields,
    },
  } as unknown as ISpec
}
