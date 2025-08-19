import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const radarRadiusAxis: SpecPipe = (spec, context) => {
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
