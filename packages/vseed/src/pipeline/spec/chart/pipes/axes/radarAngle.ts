import type { IRoseChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const radarAngleAxis: VChartSpecPipe = (spec) => {
  const result = { ...spec } as IRoseChartSpec

  if (!result.axes) {
    result.axes = []
  }

  result.axes.push({
    orient: 'angle',
    visible: true,
    zero: true,
    nice: true,
    grid: {
      visible: true,
    },
    domainLine: {
      visible: true,
    },
    tick: {
      visible: true,
    },
  })

  return result
}
