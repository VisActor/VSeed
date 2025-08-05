import type { ILineChartSpec } from '@visactor/vchart'
import type { Color, SpecPipe } from 'src/types'

export const color: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo
  const baseConfig = advancedVSeed.baseConfig.vchart as { color: Color }
  const { color } = baseConfig
  const { colorScheme, colorMapping } = color

  result.color = {
    type: 'ordinal',
    domain: unfoldInfo.colorItems,
    range: colorScheme,
    specified: colorMapping,
  }
  return result
}
