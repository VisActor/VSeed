import type { CustomThemeConfig, YBandAxis } from 'src/types'
import {
  getDarkColor,
  getDarkCrosshairLine,
  getDarkCrosshairRect,
  getDarkTableConfig,
  getDefaultLabel,
  getDefaultLegend,
  getDarkPivotChartGridConfig,
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
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      column: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      columnParallel: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      columnPercent: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      bar: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      barParallel: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      barPercent: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      area: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      areaPercent: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
        pivotGrid: getDarkPivotChartGridConfig(),
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
        pivotGrid: getDarkPivotChartGridConfig(),
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
        pivotGrid: getDarkPivotChartGridConfig(),
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
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      donut: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          labelLayout: 'labelLine',
          showDimension: true,
        },
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      radar: {
        ...baseConfig,
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      rose: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          showDimension: true,
        },
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      roseParallel: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          showDimension: true,
        },

        pivotGrid: getDarkPivotChartGridConfig(),
      },
      // other
      funnel: {
        ...baseConfig,

        pivotGrid: getDarkPivotChartGridConfig(),
      },
      heatmap: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          labelColorSmartInvert: true,
        },

        pivotGrid: getDarkPivotChartGridConfig(),
      },
    },
  }
}
