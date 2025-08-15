import type { CustomThemeConfig, YBandAxis, YLinearAxis } from 'src/types'

export const darkTheme = (): CustomThemeConfig => {
  const linearAxis: YLinearAxis = {
    nice: true,
    zero: true,
    label: {
      visible: true,
      labelAngle: 0,
      labelColor: '#E2E3E6',
      labelFontSize: 12,
      labelFontWeight: 400,
    },
    title: {
      visible: false,
      titleText: '',
      titleColor: '#FDFDFD',
      titleFontSize: 12,
      titleFontWeight: 400,
    },
    grid: {
      visible: true,
      gridColor: '#404349',
      gridWidth: 0.5,
    },
    tick: {
      visible: false,
      tickInside: false,
      tickSize: 4,
      tickColor: '#4B4F54',
    },
    line: {
      visible: false,
      lineColor: '#4B4F54',
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
      labelColor: '#E2E3E6',
      labelFontSize: 12,
      labelFontWeight: 400,
    },
    title: {
      visible: false,
      titleText: '',
      titleColor: '#FDFDFD',
      titleFontSize: 12,
      titleFontWeight: 400,
    },
    grid: {
      visible: false,
      gridColor: '#404349',
      gridWidth: 0.5,
    },
    tick: {
      visible: false,
      tickInside: false,
      tickSize: 4,
      tickColor: '#4B4F54',
    },
    line: {
      visible: true,
      lineColor: '#4B4F54',
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
    lineColor: '#E2E3E6',
    labelColor: '#4B4F54',
    labelBackgroundColor: '#ffffff',
  }
  const crosshairRect = {
    visible: true,
    labelVisible: true,
    lineColor: '#E2E3E6',
    labelColor: '#4B4F54',
    labelBackgroundColor: '#ffffff',
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
          border: true,
          maxSize: 1,
          position: 'rt',
          shapeType: 'rectRound',
          labelFontColor: '#FDFDFD',
          labelFontSize: 12,
          labelFontWeight: 400,
        },
      },
    },
    config: {
      line: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
      },
      column: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
      },
      columnParallel: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
      },
      columnPercent: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
      },
      bar: {
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
      },
      barParallel: {
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
      },
      barPercent: {
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
      },
      area: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
      },
      areaPercent: {
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
      },
      scatter: {
        xAxis: {
          ...linearAxis,
          line: {
            ...linearAxis.line,
            visible: true,
          },
        },
        yAxis: {
          ...linearAxis,
          line: {
            ...linearAxis.line,
            visible: true,
          },
        },
        crosshairLine,
      },
    },
  }
}
