import type { CustomThemeConfig, YBandAxis } from 'src/types'
import {
  getDefaultLabel,
  getDefaultLegend,
  getLightColor,
  getLightCrosshairLine,
  getLightCrosshairRect,
  getLightTableConfig,
} from '../common'
import { getDefaultTooltip } from '../common/tooltip'
import { getLightBandAxis, getLightLinearAxis } from '../common/axes'

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
    label: getDefaultLabel(),
    legend: getDefaultLegend(),
    tooltip: getDefaultTooltip(),
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
        yAxis: {
          ...linearAxis,
        },
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
        xAxis: {
          ...linearAxis,
        },
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
        yAxis: {
          ...linearAxis,
        },
        crosshairLine,
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
