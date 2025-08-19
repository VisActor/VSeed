import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const radarAngleAxis: SpecPipe = (spec, context) => {
  const result = { ...spec } as IRoseChartSpec
  const { advancedVSeed } = context
  const { dimensions, measures } = advancedVSeed

  if (!dimensions || !measures) {
    return result
  }

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
