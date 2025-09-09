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
    labelAutoLimitLength: 80,
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

  const baseConfig: {
    backgroundColor?: BackgroundColor
    color?: Color
    label?: Label
    tooltip?: Tooltip
    legend?: Legend
  } = {
    backgroundColor: 'transparent',
    color: {
      linearColorScheme: [
        '#5766EC',
        '#6372F0',
        '#7080F4',
        '#7C8CFA',
        '#8998FF',
        '#95A3FF',
        '#A0AEFF',
        '#ACB9FF',
        '#B7C4FF',
        '#C2CEFF',
      ].reverse(),
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
  }
  const tableConfig: TableConfig = {
    borderColor: '#e3e5eb',

    bodyFontSize: 12,
    bodyFontColor: '#141414',
    bodyBackgroundColor: 'transparent',

    headerFontSize: 12,
    headerFontColor: '#21252c',
    headerBackgroundColor: '#f6f7f9',

    hoverBodyBackgroundColor: '#bedaff',
    hoverBodyInlineBackgroundColor: '#bedaff33',
    hoverHeaderBackgroundColor: '#D9DDE4',
    hoverHeaderInlineBackgroundColor: '#D9DDE455',

    selectedBorderColor: '#4080ff',
    selectedBackgroundColor: '#bedaff33',

    backgroundColor: 'transparent',
  }

  return {
    config: {
      // table
      table: tableConfig,
      pivotTable: tableConfig,
      // cartesian
      line: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine,
      },
      column: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
      },
      columnParallel: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
      },
      columnPercent: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
      },
      bar: {
        ...baseConfig,
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
      },
      barParallel: {
        ...baseConfig,
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
      },
      barPercent: {
        ...baseConfig,
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
      },
      area: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine,
      },
      areaPercent: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine,
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
      dualAxis: {
        ...baseConfig,
        xAxis: bandAxis,
        primaryYAxis: linearAxis,
        secondaryYAxis: { ...linearAxis, grid: { visible: false } },
        dualChartType: {
          primary: 'column',
          secondary: 'line',
        },
        crosshairRect,
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
      },
      heatmap: {
        ...baseConfig,
      },
    },
  }
}
