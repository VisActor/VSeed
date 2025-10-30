import { isPivotChart } from 'src/pipeline/utils'
import type { SpecPipe } from 'src/types'
import { isNullish } from 'remeda'
import type { ISpec } from '@visactor/vchart'

export const datasetBoxplot: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { id, foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  const fields: Record<string, object> = {}

  return {
    ...spec,
    data: {
      id,
      // 透视表不使用 dataValues
      values: isPivotChart(vseed) ? undefined : advancedVSeed.dataset.flat(),
      transforms: [
        {
          type: 'boxplot',
          options: {
            includeValues: false,
            field: foldInfo.measureValue,
            groupField: [
              ...(encoding.color ?? []),
              ...(encoding.x ?? []),
              unfoldInfo.encodingX,
              unfoldInfo.encodingColorId,
              unfoldInfo.encodingColor,
            ].filter((n) => !isNullish(n)),
            whiskers: 1.5,
          },
        },
      ],

      fields: fields,
    },
  } as unknown as ISpec
}
