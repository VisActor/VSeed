import type { SpecPipe, Tooltip } from 'src/types'

const defaultTooltip: Tooltip = {
  enable: true,
}

export const tooltip: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const baseConfig = advancedVSeed.baseConfig.vchart as { tooltip: Tooltip }
  const { tooltip = defaultTooltip } = baseConfig

  const { enable } = tooltip

  result.tooltip = {
    visible: enable,
  }
  return result
}
