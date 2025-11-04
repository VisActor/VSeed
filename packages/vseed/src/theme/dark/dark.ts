import type { CustomThemeConfig, YBandAxis } from 'src/types'
import {
  getDarkColor,
  getDarkCrosshairLine,
  getDarkCrosshairRect,
  getDarkTableConfig,
  getDefaultLegend,
  getDarkPivotChartGridConfig,
  getDarkLabel,
} from '../common'
import { getDefaultTooltip } from '../common/tooltip'
import { getDarkBandAxis, getDarkLinearAxis } from '../common/axes'
import { getDarkAnnotation } from '../common/annotaion'
import { getDarkFunnelTransformTheme } from '../common/funnelTransform'
import { getDarkHeatmapCellTheme } from '../common/heatmapCell'
import { getDarkHistogramRegressionLine } from '../common/regressionLine'

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
    label: getDarkLabel(),
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
        annotation: getDarkAnnotation(),
      },
      column: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
      },
      columnParallel: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
      },
      columnPercent: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
      },
      bar: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
      },
      barParallel: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
      },
      barPercent: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect: crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
      },
      area: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
      },
      areaPercent: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine: crosshairLine,
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
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
        annotation: getDarkAnnotation(),
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
        annotation: getDarkAnnotation(),
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
        transform: getDarkFunnelTransformTheme(),

        pivotGrid: getDarkPivotChartGridConfig(),
      },
      heatmap: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          labelColorSmartInvert: true,
        },

        cell: getDarkHeatmapCellTheme(),
        pivotGrid: getDarkPivotChartGridConfig(),
      },
      histogram: {
        ...baseConfig,

        xAxis: linearAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
        histogramRegressionLine: getDarkHistogramRegressionLine(),
      },
      boxPlot: {
        ...baseConfig,

        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect: crosshairRect,
        pivotGrid: getDarkPivotChartGridConfig(),
        annotation: getDarkAnnotation(),
      },
    },
  }
}
