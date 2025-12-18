import type { IBarChartSpec } from '@visactor/vchart'
import type { Color, VChartSpecPipe } from 'src/types'

export const linearColorForDualAxis: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, chartType } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const baseConfig = advancedVSeed.config[chartType] as { color: Color }

  if (!baseConfig || !baseConfig.color) {
    return result
  }

  const { color } = baseConfig
  const { colorScheme, linearColorScheme } = color

  result.color = {
    type: 'linear',
    range: linearColorScheme || colorScheme || [],
    domain: spec.series!.map((s) => {
      return {
        dataId: (s as any).data.id,
        fields: [unfoldInfo.encodingColor],
      }
    }),
  }

  return result
}
