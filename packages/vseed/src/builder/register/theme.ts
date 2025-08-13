import type { CustomThemeConfig } from 'src/types'
import { Builder } from '../builder'
import { darkTheme, lightTheme } from '../../theme'

export const registerCustomTheme = (
  key: string,
  themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig),
) => {
  const customTheme =
    typeof themeConfig === 'function' ? themeConfig({ lightTheme: lightTheme(), darkTheme: darkTheme() }) : themeConfig
  Builder._themeMap[key] = customTheme
}

export const registerLightTheme = () => {
  registerCustomTheme('light', lightTheme())
}

export const registerDarkTheme = () => {
  registerCustomTheme('dark', darkTheme())
}
