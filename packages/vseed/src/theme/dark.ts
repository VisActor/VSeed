import type {
  BackgroundColor,
  Color,
  CustomThemeConfig,
  Label,
  Legend,
  TableConfig,
  Tooltip,
  YBandAxis,
  YLinearAxis,
} from 'src/types'

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

  const baseConfig: {
    backgroundColor?: BackgroundColor
    color?: Color
    label?: Label
    tooltip?: Tooltip
    legend?: Legend
  } = {
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
  }

  const tableConfig: TableConfig = {
    borderColor: '#4b4e53',

    bodyFontSize: 12,
    bodyFontColor: '#fdfdfd',
    bodyBackgroundColor: 'transparent',

    headerFontSize: 12,
    headerFontColor: '#fdfdfd',
    headerBackgroundColor: '#36393e',

    hoverBodyBackgroundColor: '#4284ff66',
    hoverBodyInlineBackgroundColor: '#4284ff10',
    hoverHeaderBackgroundColor: '#6f7984cc',
    hoverHeaderInlineBackgroundColor: '#4b4f54',

    selectedBorderColor: '#3073f2',
    selectedBackgroundColor: '#4284ff33',
  }

  return {
    config: {
      table: tableConfig,
      pivotTable: tableConfig,

      // cartesian
      line: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
      },
      column: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
      },
      columnParallel: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
      },
      columnPercent: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
      },
      bar: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
      },
      barParallel: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
      },
      barPercent: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
      },
      area: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
      },
      areaPercent: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
      },
      areaRange: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
      },
      scatter: {
        ...baseConfig,

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
      // polar
      pie: {
        ...baseConfig,
      },
      donut: {
        ...baseConfig,
      },
      radar: {
        ...baseConfig,
      },
      rose: {
        ...baseConfig,
      },
      roseParallel: {
        ...baseConfig,
      },
      // other
      funnel: {
        ...baseConfig,
        color: {
          colorScheme: [
            '#2E62F1',
            '#3A6EF6',
            '#4780FA',
            '#548CFE',
            '#6198FF',
            '#6FA3FF',
            '#7CACFF',
            '#88B7FF',
            '#94C2FF',
            '#A0CEFF',
          ],
        },
      },
      heatmap: {
        ...baseConfig,
      },
    },
  }
}
