import type { ILineChartSpec } from '@visactor/vchart'
import type { Label, SpecPipe } from 'src/types'

export const label: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const baseConfig = advancedVSeed.baseConfig.vchart

  if (!baseConfig || !baseConfig.label) {
    return result
  }

  const { label } = baseConfig
  const { enable } = label as Label

  result.label = {
    visible: enable,
  }
  return result
}
