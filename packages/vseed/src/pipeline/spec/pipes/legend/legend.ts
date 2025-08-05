import type { Legend, SpecPipe } from 'src/types'

const defaultLegend = {
  enable: true,
}

export const legend: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const baseConfig = advancedVSeed.baseConfig.vchart
  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { legend = defaultLegend } = baseConfig
  const { enable } = legend as Legend

  result.legends = {
    visible: enable,
  }
  return result
}
