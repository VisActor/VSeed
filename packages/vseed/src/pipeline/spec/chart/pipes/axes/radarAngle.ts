import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const radarAngleAxis: SpecPipe<Spec> = (spec) => {
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
