import type { CustomThemeConfig, YBandAxis } from 'src/types'
import {
  getFunnelLightLabel,
  getLightColor,
  getLightColorLegend,
  getLightCrosshairLine,
  getLightCrosshairRect,
  getLightLabel,
  getLightLegend,
  getLightPivotChartGridConfig,
  getLightTableConfig,
} from '../common'
import { getLightTooltip } from '../common/tooltip'
import { getLightBandAxis, getLightLinearAxis } from '../common/axes'
import { getLightAnnotation } from '../common/annotaion'
import { getLightFunnelTransformTheme } from '../common/funnelTransform'
import { getLightHeatmapCellTheme } from '../common/heatmapCell'
import { getLightRegressionLine } from '../common/regressionLine'
import { getLightBoxPlotStyle, getLightOutlierStyle } from '../common/boxPlot'

export const lightTheme = (): CustomThemeConfig => {
  const linearAxis = getLightLinearAxis()
  const bandAxis: YBandAxis = getLightBandAxis()
  const barBandAxis: YBandAxis = {
    ...bandAxis,
    labelAutoHide: false,
    labelAutoHideGap: 1,
    labelAutoLimit: false,
    labelAutoLimitLength: undefined,
    labelAutoRotate: false,
    labelAutoRotateAngleRange: [0, -45, -90],
  }

  const crosshairLine = getLightCrosshairLine()
  const crosshairRect = getLightCrosshairRect()

  const baseConfig = {
    backgroundColor: 'transparent',
    color: getLightColor(),
    label: getLightLabel(),
    legend: getLightLegend(),
    tooltip: getLightTooltip(),
  }
  const tableConfig = getLightTableConfig()

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

        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
      },
      column: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),

        regressionLine: getLightRegressionLine(),
      },
      columnParallel: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
      },
      columnPercent: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: {
          ...linearAxis,
        },
        crosshairRect,
        stackCornerRadius: [4, 4, 0, 0],
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
      },
      bar: {
        ...baseConfig,
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
      },
      barParallel: {
        ...baseConfig,
        xAxis: linearAxis,
        yAxis: barBandAxis,
        crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
      },
      barPercent: {
        ...baseConfig,
        xAxis: {
          ...linearAxis,
        },
        yAxis: barBandAxis,
        crosshairRect,
        stackCornerRadius: [0, 4, 4, 0],
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
      },
      area: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: linearAxis,
        crosshairLine,
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
      },
      areaPercent: {
        ...baseConfig,
        xAxis: bandAxis,
        yAxis: {
          ...linearAxis,
        },
        crosshairLine,
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
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
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),

        regressionLine: getLightRegressionLine(),
      },
      dualAxis: {
        ...baseConfig,
        xAxis: bandAxis,
        primaryYAxis: linearAxis,
        secondaryYAxis: { ...linearAxis, grid: { visible: false } },
        crosshairRect,
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
      },
      // polar
      pie: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          labelLayout: 'arc',
          showDimension: true,
        },
        pivotGrid: getLightPivotChartGridConfig(),
      },
      donut: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          labelLayout: 'arc',
          showDimension: true,
        },
        pivotGrid: getLightPivotChartGridConfig(),
      },
      radar: {
        ...baseConfig,
        pivotGrid: getLightPivotChartGridConfig(),
      },
      rose: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          showDimension: true,
        },
        pivotGrid: getLightPivotChartGridConfig(),
      },
      roseParallel: {
        ...baseConfig,
        label: {
          ...baseConfig.label,
          showValuePercent: true,
          showDimension: true,
        },

        pivotGrid: getLightPivotChartGridConfig(),
      },
      // other
      funnel: {
        ...baseConfig,
        label: getFunnelLightLabel(),
        transform: getLightFunnelTransformTheme(),

        pivotGrid: getLightPivotChartGridConfig(),
      },
      heatmap: {
        ...baseConfig,
        legend: getLightColorLegend(),
        xAxis: bandAxis,
        yAxis: bandAxis,
        label: {
          ...baseConfig.label,
          labelColorSmartInvert: true,
        },
        cell: getLightHeatmapCellTheme(),
        pivotGrid: getLightPivotChartGridConfig(),
      },
      histogram: {
        ...baseConfig,
        xAxis: linearAxis,
        yAxis: linearAxis,
        crosshairRect,
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),
        regressionLine: getLightRegressionLine(),
      },
      boxPlot: {
        ...baseConfig,
        xAxis: linearAxis,
        yAxis: linearAxis,
        crosshairRect,
        pivotGrid: getLightPivotChartGridConfig(),
        annotation: getLightAnnotation(),

        boxPlotStyle: getLightBoxPlotStyle(),
        outlierStyle: getLightOutlierStyle(),
      },
    },
  }
}
