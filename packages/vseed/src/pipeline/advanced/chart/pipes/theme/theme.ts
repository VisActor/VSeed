import { clone, mergeDeep } from 'remeda'
import type { AdvancedPipe, AdvancedVSeed } from 'src/types'

export const theme: AdvancedPipe = (advancedVSeed, context) => {
  const { customTheme, vseed } = context
  const { theme = 'light', chartType } = vseed
  const result = {
    ...advancedVSeed,
  } as AdvancedVSeed

  if (!customTheme || !customTheme[theme]) {
    return result
  }

  const chartConfigTheme = customTheme?.[theme].config?.[chartType]
  if (chartConfigTheme) {
    const chartConfig = result.config?.[chartType] || {}
    const mergedConfig = mergeDeep(chartConfigTheme, clone(chartConfig))
    result.config = {
      [chartType]: mergedConfig,
    }
  }

  const chartCustomTheme = customTheme?.[theme]?.config?.[chartType]

  result.customTheme = {
    config: {
      [chartType]: chartCustomTheme,
    },
  }

  return result
}
