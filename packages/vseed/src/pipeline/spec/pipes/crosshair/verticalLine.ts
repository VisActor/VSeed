import type { ICartesianCrosshairSpec, ILineChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const verticalLine: SpecPipe = (spec) => {
  const result = { ...spec } as ILineChartSpec

  if (!result.crosshair) {
    result.crosshair = {}
  }

  const crosshair = result.crosshair as ICartesianCrosshairSpec
  crosshair.xField = {
    visible: true,
    line: {
      type: 'line', // Defaults is `rect`
      style: {
        lineWidth: 1,
        opacity: 1,
        stroke: '#000',
        lineDash: [2, 2],
      },
    },
    bindingAxesIndex: [0],
    label: {
      visible: true, // label is off by default
    },
  }

  return result
}
