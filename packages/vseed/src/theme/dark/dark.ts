import type { CustomThemeConfig, YBandAxis } from 'src/types'
import {
  getDarkColor,
  getDarkCrosshairLine,
  getDarkCrosshairRect,
  getDarkTableConfig,
  getDefaultLabel,
  getDefaultLegend,
} from '../common'
import { getDefaultTooltip } from '../common/tooltip'
import { getDarkBandAxis, getDarkLinearAxis } from '../common/axes'

export const darkTheme = (): CustomThemeConfig => {
  const linearAxis = getDarkLinearAxis()
  const bandAxis = getDarkBandAxis()
  const barBandAxis: YBandAxis = {
    ...bandAxis,
    labelAutoHide: false,
    labelAutoHideGap: 1,
    labelAutoLimit: false,
    labelAutoLimitLength: undefined,
    labelAutoRotate: false,
    labelAutoRotateAngleRange: [0, -45, -90],
  }
  const crosshairLine = getDarkCrosshairLine()
  const crosshairRect = getDarkCrosshairRect()

  const baseConfig = {
    backgroundColor: 'transparent',
    color: getDarkColor(),
    label: getDefaultLabel(),
    legend: getDefaultLegend(),
    tooltip: getDefaultTooltip(),
  }

  const tableConfig = getDarkTableConfig()

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
      scatter: {
        ...baseConfig,
        crosshairLine,
        sizeRange: [8, 24],
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
        label: {
          ...baseConfig.label,
          showValue: false,
          showValuePercent: false,
        },
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
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          labelLayout: 'labelLine',
          showDimension: true,
        },
      },
      donut: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          labelLayout: 'labelLine',
          showDimension: true,
        },
      },
      radar: {
        ...baseConfig,
      },
      rose: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          showDimension: true,
        },
      },
      roseParallel: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          showDimension: true,
        },
      },
      // other
      funnel: {
        ...baseConfig,
      },
      heatmap: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          labelColorSmartInvert: true,
        },
      },
    },
  }
}
