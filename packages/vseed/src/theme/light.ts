import type { CustomThemeConfig, YBandAxis, YLinearAxis } from 'src/types'

export const lightTheme = (): CustomThemeConfig => {
  const linearAxis: YLinearAxis = {
    nice: true,
    zero: true,
    inverse: false,
    label: {
      visible: true,
      labelAngle: 0,
      labelColor: '#797B85',
      labelFontSize: 12,
      labelFontWeight: 400,
    },
    title: {
      visible: false,
      titleText: '',
      titleColor: '#646A73',
      titleFontSize: 12,
      titleFontWeight: 400,
    },
    grid: {
      visible: true,
      gridColor: 'rgba(54, 65, 89, 0.15)',
      gridWidth: 0.5,
    },
    tick: {
      visible: false,
      tickInside: false,
      tickSize: 4,
      tickColor: 'rgba(54, 65, 89, 0.30)',
    },
    line: {
      visible: false,
      lineColor: 'rgba(54, 65, 89, 0.30)',
      lineWidth: 1,
    },
  }
  const bandAxis: YBandAxis = {
    labelAutoHide: true,
    labelAutoHideGap: 4,
    labelAutoLimit: true,
    labelAutoLimitLength: 100,
    labelAutoRotate: true,
    labelAutoRotateAngleRange: [0, -45, -90],
    label: {
      visible: true,
      labelAngle: 0,
      labelColor: '#797B85',
      labelFontSize: 12,
      labelFontWeight: 400,
    },
    title: {
      visible: false,
      titleText: '',
      titleColor: '#646A73',
      titleFontSize: 12,
      titleFontWeight: 400,
    },
    grid: {
      visible: false,
      gridColor: 'rgba(54, 65, 89, 0.15)',
      gridWidth: 0.5,
    },
    tick: {
      visible: false,
      tickInside: false,
      tickSize: 4,
      tickColor: 'rgba(54, 65, 89, 0.30)',
    },
    line: {
      visible: true,
      lineColor: 'rgba(54, 65, 89, 0.30)',
      lineWidth: 1,
    },
  }

  const barBandAxis: YBandAxis = {
    ...bandAxis,
    labelAutoHide: false,
    labelAutoHideGap: 1,
    labelAutoLimit: false,
    labelAutoLimitLength: undefined,
    labelAutoRotate: false,
    labelAutoRotateAngleRange: [0, -45, -90],
  }

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
    config: {
      line: {
        xAxis: bandAxis,
        yAxis: linearAxis,
      },
      column: {
        xAxis: bandAxis,
        yAxis: linearAxis,
      },
      columnParallel: {
        xAxis: bandAxis,
        yAxis: linearAxis,
      },
      columnPercent: {
        xAxis: bandAxis,
        yAxis: linearAxis,
      },
      bar: {
        xAxis: linearAxis,
        yAxis: barBandAxis,
      },
      barParallel: {
        xAxis: linearAxis,
        yAxis: barBandAxis,
      },
      barPercent: {
        xAxis: linearAxis,
        yAxis: barBandAxis,
      },
      area: {
        xAxis: bandAxis,
        yAxis: linearAxis,
      },
      areaPercent: {
        xAxis: bandAxis,
        yAxis: linearAxis,
      },
    },
  }
}
