import { clone, isObjectType, merge, mergeDeep } from 'remeda'
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

    // 数组项不会被Merge, 需要将1个主题配置, 合并到数组的每一项
    for (const _k in mergedConfig) {
      const key = _k as keyof typeof mergedConfig
      // 配置的第一层, 如果是数组, 则数组的每一项目和主题配置合并
      if (Array.isArray(mergedConfig[key])) {
        mergedConfig[key] = mergeArray(mergedConfig[key], chartConfigTheme[key])
      }
    }

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

const mergeArray = <Destination extends Array<object>, Source extends object>(
  arr: Destination,
  themeItem: Source,
): Destination => {
  if (!Array.isArray(arr)) {
    return arr
  }

  if (arr.some((d) => !isObjectType(d))) {
    return arr
  }

  return arr.map((item) => {
    return merge(themeItem, item)
  }) as Destination
}
