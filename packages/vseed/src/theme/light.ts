import type { CustomThemeConfig } from 'src/types'

export const lightTheme = (): CustomThemeConfig => {
  return {
    baseConfig: {
      vtable: {
        backgroundColor: '#ffffff',
      },
      vchart: {
        backgroundColor: '#ffffff',
      },
    },
  }
}
