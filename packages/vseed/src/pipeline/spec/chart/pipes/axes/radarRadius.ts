import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const radarRadiusAxis: SpecPipe = (spec) => {
  const result = { ...spec } as IRoseChartSpec

  if (!result.axes) {
    result.axes = []
  }

  result.axes.push({
    orient: 'radius',
    visible: true,
    zero: true,
    nice: true,
    grid: {
      visible: true,
    },
    tick: {
      visible: true,
    },
    label: {
      visible: true,
    },
    domainLine: {
      visible: true,
    },
  })

  return result
}
