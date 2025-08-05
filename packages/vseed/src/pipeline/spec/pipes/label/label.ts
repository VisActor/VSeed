import type { ILineChartSpec } from '@visactor/vchart'
import type { Legend, SpecPipe } from 'src/types'

const defaultLabel = {
  enable: true,
}

export const label: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const baseConfig = advancedVSeed.baseConfig.vchart as { label: Legend }
  const { label = defaultLabel } = baseConfig

  const { enable } = label

  result.label = {
    visible: enable,
  }
  return result
}
