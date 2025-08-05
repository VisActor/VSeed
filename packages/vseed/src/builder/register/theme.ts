import type { CustomThemeConfig } from 'src/types'
import { Builder } from '../builder'
import { darkTheme, lightTheme } from '../../theme'

export const registerCustomTheme = (key: string, themeConfig: CustomThemeConfig) => {
  Builder._themeMap[key] = themeConfig
}

export const registerLightTheme = () => {
  registerCustomTheme('light', lightTheme())
}

export const registerDarkTheme = () => {
  registerCustomTheme('dark', darkTheme())
}
