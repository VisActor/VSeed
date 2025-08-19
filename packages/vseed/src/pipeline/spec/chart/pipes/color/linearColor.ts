import type { ILineChartSpec } from '@visactor/vchart'
import type { Color, SpecPipe } from 'src/types'

export const linearColor: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { color: Color }

  if (!baseConfig || !baseConfig.color) {
    return result
  }

  const { color } = baseConfig
  const { colorScheme } = color

  result.color = {
    type: 'linear',
    domain: [
      {
        dataId: datasetReshapeInfo[0].id,
        fields: encoding?.[0]?.color,
      },
    ],
    range: colorScheme,
  } as ILineChartSpec['color']
  return result
}
