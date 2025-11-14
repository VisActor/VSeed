import type { IBarChartSpec } from '@visactor/vchart'
import type { Color, VChartSpecPipe } from 'src/types'

export const linearColorForDualAxis: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, chartType } = advancedVSeed
  const { unfoldInfo, id } = datasetReshapeInfo[0]
  const baseConfig = advancedVSeed.config[chartType] as { color: Color }

  if (!baseConfig || !baseConfig.color) {
    return result
  }

  const { color } = baseConfig
  const { colorScheme, linearColorScheme } = color

  result.color = {
    type: 'linear',
    range: linearColorScheme || colorScheme || [],
    domain: [
      {
        dataId: `${id}-primary-dataset`,
        fields: [unfoldInfo.encodingColor],
      },
      {
        dataId: `${id}-secondary-dataset`,
        fields: [unfoldInfo.encodingColor],
      },
    ],
  }

  return result
}
