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
    labelAutoRotate: true,
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
        yAxis: bandAxis,
      },
      barParallel: {
        xAxis: linearAxis,
        yAxis: bandAxis,
      },
      barPercent: {
        xAxis: linearAxis,
        yAxis: bandAxis,
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
