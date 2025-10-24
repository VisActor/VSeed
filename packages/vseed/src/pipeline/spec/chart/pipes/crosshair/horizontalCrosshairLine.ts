import type { ICartesianCrosshairSpec, ILineChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const horizontalCrosshairLine: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed

  const config = advancedVSeed.config?.[chartType as 'line']?.crosshairLine
  if (!config) {
    return result
  }

  if (!result.crosshair) {
    result.crosshair = {
      followTooltip: true,
    }
  }

  const visible = config.visible || true
  const lineColor = config.lineColor || undefined
  const labelColor = config.labelColor || undefined
  const labelVisible = config.labelVisible || undefined
  const labelBackgroundColor = config.labelBackgroundColor || undefined

  const crosshair = result.crosshair as ICartesianCrosshairSpec
  crosshair.yField = {
    visible,
    line: {
      type: 'line',
      style: {
        lineWidth: 1,
        opacity: 1,
        stroke: lineColor,
        lineDash: config.lineDash ?? [4, 2],
      },
    },
    label: {
      visible: labelVisible,
      labelBackground: {
        visible: labelVisible,
        style: {
          fill: labelBackgroundColor,
        },
      },
      style: {
        fill: labelColor,
      },
    },
  }

  return result
}
