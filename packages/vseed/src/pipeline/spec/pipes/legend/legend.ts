import type { Legend, SpecPipe } from 'src/types'

const defaultLegend = {
  enable: true,
}

export const legend: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const baseConfig = advancedVSeed.baseConfig.vchart as { legend: Legend }
  const { legend = defaultLegend } = baseConfig

  const { enable } = legend

  result.legends = {
    visible: enable,
  }
  return result
}
