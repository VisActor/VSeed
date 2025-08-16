import type { ICartesianCrosshairSpec, ILineChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const verticalCrosshairRect: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed

  const config = advancedVSeed.config?.[chartType as 'column']?.crosshairRect
  if (!config) {
    return result
  }

  if (!result.crosshair) {
    result.crosshair = {}
  }

  const { visible = true, rectColor, labelColor, labelVisible, labelBackgroundColor } = config
  const crosshair = result.crosshair as ICartesianCrosshairSpec
  crosshair.xField = {
    visible,
    line: {
      type: 'rect',
      style: {
        lineWidth: 0,
        opacity: 0.2,
        fill: rectColor,
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
