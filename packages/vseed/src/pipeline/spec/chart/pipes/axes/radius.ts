import type { IRoseChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const radiusAxis: VChartSpecPipe = (spec) => {
  const result = { ...spec } as IRoseChartSpec

  if (!result.axes) {
    result.axes = []
  }

  result.axes.push({
    type: 'linear',
    orient: 'radius',
    visible: false,
    zero: true,
    nice: false,
  })

  return result
}
