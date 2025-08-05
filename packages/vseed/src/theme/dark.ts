import type { CustomThemeConfig } from 'src/types'

export const darkTheme = (): CustomThemeConfig => {
  return {
    baseConfig: {
      vtable: {
        backgroundColor: '#141414',
      },
      vchart: {
        backgroundColor: '#141414',
        color: {
          colorScheme: [
            '#2E62F1',
            '#4DC36A',
            '#FF8406',
            '#FFCC00',
            '#4F44CF',
            '#5AC8FA',
            '#003A8C',
            '#B08AE2',
            '#FF6341',
            '#98DD62',
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
