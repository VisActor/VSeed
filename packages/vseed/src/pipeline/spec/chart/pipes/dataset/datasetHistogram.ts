import type { ISpec } from '@visactor/vchart'
import { isPivotChart } from 'src/pipeline/utils'
import type { SpecPipe } from 'src/types'

export const datasetHistogram: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { id, foldInfo } = datasetReshapeInfo[0]

  const fields: Record<string, object> = {}

  return {
    ...spec,
    data: {
      id,
      // 透视表不使用 dataValues
      values: isPivotChart(vseed) ? undefined : advancedVSeed.dataset.flat(),
      transforms: [
        {
          type: 'bin',
          options: {
            bins: 5,
            field: foldInfo.measureValue,
          },
        },
      ],

      fields: fields,
    },
  } as unknown as ISpec
}
