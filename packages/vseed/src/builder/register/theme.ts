import type { CustomThemeConfig } from 'src/types'
import { Builder } from '../builder'
import { darkTheme, lightTheme } from '../../theme'

export const registerTheme = (key: string, themeConfig: CustomThemeConfig) => {
  Builder._themeMap[key] = themeConfig
}

export const registerLightTheme = () => {
  registerTheme('light', lightTheme())
}

export const registerDarkTheme = () => {
  registerTheme('dark', darkTheme())
}
