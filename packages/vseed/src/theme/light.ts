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
      gridColor: '#36415926',
      gridWidth: 0.5,
    },
    tick: {
      visible: false,
      tickInside: false,
      tickSize: 4,
      tickColor: '#3641594d',
    },
    line: {
      visible: false,
      lineColor: '#3641594d',
      lineWidth: 1,
    },
  }
  const bandAxis: YBandAxis = {
    labelAutoHide: true,
    labelAutoHideGap: 4,
    labelAutoLimit: true,
    labelAutoLimitLength: 100,
    labelAutoRotate: false,
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
      gridColor: '#36415926',
      gridWidth: 0.5,
    },
    tick: {
      visible: false,
      tickInside: false,
      tickSize: 4,
      tickColor: '#3641594d',
    },
    line: {
      visible: true,
      lineColor: '#3641594d',
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

  const crosshairLine = {
    visible: true,
    labelVisible: true,
    lineColor: '#3641594d',
    labelColor: '#ffffff',
    labelBackgroundColor: '#364159',
  }
  const crosshairRect = {
    visible: true,
    labelVisible: true,
    rectColor: '#3641594d',
    labelColor: '#ffffff',
    labelBackgroundColor: '#364159',
  }
  return {
    baseConfig: {
      vtable: {
        backgroundColor: 'transparent',
      },
      vchart: {
        backgroundColor: 'transparent',
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
          border: true,
          maxSize: 1,
          shapeType: 'rectRound',
          position: 'rt',
          labelFontColor: '#646A73',
          labelFontSize: 12,
          labelFontWeight: 400,
        },
      },
    },
    config: {
      line: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine,
      },
      column: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect,
      },
      columnParallel: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect,
      },
      columnPercent: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect,
      },
      bar: {
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect,
      },
      barParallel: {
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect,
      },
      barPercent: {
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect,
      },
      area: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine,
      },
      areaPercent: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine,
      },
    },
  }
}
