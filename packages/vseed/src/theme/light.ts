import type { CustomThemeConfig } from 'src/types'

export const lightTheme = (): CustomThemeConfig => {
  return {
    baseConfig: {
      vtable: {
        backgroundColor: '#ffffff',
      },
      vchart: {
        backgroundColor: '#ffffff',
        color: {
          colorScheme: [
            '#8D72F6',
            '#5766EC',
            '#66A3FE',
            '#51D5E6',
            '#4EC0B3',
            '#F9DF90',
            '#F9AD71',
            '#ED8888',
            '#E9A0C3',
            '#D77DD3',
          ],
        },
        label: {
          enable: true,
        },
        tooltip: {
          enable: true,
        },
        legend: {
          enable: true,
        },
      },
    },
  }
}
