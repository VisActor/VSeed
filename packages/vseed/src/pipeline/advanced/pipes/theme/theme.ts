import { clone, mergeDeep } from 'remeda'
import type { AdvancedPipe } from 'src/types'

export const vchartTheme: AdvancedPipe = (advancedVSeed, context) => {
  const { customTheme, vseed } = context
  const { theme = 'light' } = vseed
  const result = {
    ...advancedVSeed,
  }

  if (!customTheme || !customTheme[theme]) {
    return result
  }
  const config = result.baseConfig?.vchart
  const themeConfig = customTheme?.[theme].baseConfig?.vchart

  if (!themeConfig || !config) {
    return result
  }

  const mergedConfig = mergeDeep(themeConfig, clone(config))
  result.baseConfig = {
    vchart: mergedConfig,
  }
  return result
}

export const vtableTheme: AdvancedPipe = (advancedVSeed, context) => {
  const { customTheme, vseed } = context
  const { theme = 'light' } = vseed
  const result = {
    ...advancedVSeed,
  }

  if (!customTheme || !customTheme[theme]) {
    return result
  }

  const config = result.baseConfig?.vtable
  const themeConfig = customTheme?.[theme].baseConfig?.vtable

  if (!themeConfig || !config) {
    return result
  }

  const mergedConfig = mergeDeep(themeConfig, clone(config))
  result.baseConfig = {
    vchart: mergedConfig,
  }
  return result
}
