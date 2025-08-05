import type { CustomThemeConfig } from 'src/types'

export const darkTheme = (): CustomThemeConfig => {
  return {
    baseConfig: {
      vtable: {
        backgroundColor: '#141414',
      },
      vchart: {
        backgroundColor: '#141414',
      },
    },
  }
}
