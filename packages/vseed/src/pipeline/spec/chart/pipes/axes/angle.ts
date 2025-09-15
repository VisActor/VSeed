import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const angleAxis: SpecPipe = (spec, context) => {
  const result = { ...spec } as IRoseChartSpec
  const { advancedVSeed } = context
  const { dimensions, measures } = advancedVSeed

  if (!dimensions || !measures) {
    return result
  }

  const is0D = dimensions.length === 0
  const is1M1D = dimensions.length === 1 && measures.length === 1
  const showAxis = !(is0D || is1M1D)

  if (!result.axes) {
    result.axes = []
  }

  result.axes.push({
    type: 'band',
    orient: 'angle',
    visible: showAxis,
    zero: true,
    nice: showAxis ? true : false,
    paddingInner: showAxis ? [0.15, 0.1] : [0, 0],
    paddingOuter: showAxis ? [0.075, 0.1] : [0, 0],
    grid: {
      visible: showAxis,
    },
    domainLine: {
      visible: showAxis,
    },
    tick: {
      visible: showAxis,
    },
  })

  return result
}
