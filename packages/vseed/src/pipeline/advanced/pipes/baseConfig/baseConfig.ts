import { mergeDeep } from 'remeda'
import type { AdvancedPipe, VChartBaseConfig } from 'src/types'

export const vchartBaseConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed, customTheme } = context
  const { backgroundColor, theme } = vseed
  const result = {
    ...advancedVSeed,
  }
  // theme 优先级低于用户配置的
  const higherPriorityBaseConfig: VChartBaseConfig = {
    backgroundColor,
  }

  if (!theme || !customTheme || !customTheme[theme].baseConfig?.vchart) {
    return {
      ...result,
      baseConfig: {
        vchart: {
          ...higherPriorityBaseConfig,
        },
      },
    }
  }

  const customThemeConfig = customTheme?.[theme]
  const lowerPriorityBaseConfig = customThemeConfig.baseConfig?.vchart ?? {}
  const mergedBaseConfig = mergeDeep(higherPriorityBaseConfig, lowerPriorityBaseConfig)

  return {
    ...result,
    baseConfig: {
      vchart: {
        ...mergedBaseConfig,
      },
    },
  }
}

export const vtableBaseConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { backgroundColor } = vseed
  return {
    ...advancedVSeed,
    baseConfig: {
      vtable: {
        backgroundColor,
      },
    },
  }
}
