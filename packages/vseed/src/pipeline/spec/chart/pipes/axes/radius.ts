import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const radiusAxis: SpecPipe = (spec) => {
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
