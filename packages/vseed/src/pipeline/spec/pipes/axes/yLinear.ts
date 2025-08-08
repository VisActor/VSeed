import type { ISpec } from '@visactor/vchart'
import type { SpecPipe, YLinearAxis } from 'src/types'

export const yLinear: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const config = advancedVSeed.config?.[chartType]?.yAxis as YLinearAxis

  if (!result.axes) {
    result.axes = []
  }

  if (!config) {
    result.axes = [
      ...result.axes,
      {
        visible: true,
        type: 'linear',
        orient: 'left',
      },
    ] as ISpec['axes']
    return result
  }

  const {
    visible = true,
    label,
    tick,
    title,
    grid,
    line,

    zero,
    nice,
    max,
    min,
  } = config

  const linearAxis = {
    visible: visible,
    type: 'linear',
    orient: 'left',
    nice: nice,
    zero: zero,
    max,
    min,
    title: {
      visible: title?.visible,
      text: title?.titleText,
      style: {
        fill: title?.titleColor,
        fontSize: title?.titleFontSize,
        fontWeight: title?.titleFontWeight,
      },
    },
    tick: {
      visible: tick?.visible,
      tickSize: tick?.tickSize,
      inside: tick?.tickInside,
      style: {
        stroke: tick?.tickColor,
      },
    },
    label: {
      visible: label?.visible,
      style: {
        fill: label?.labelColor,
        angle: label?.labelAngle,
        fontSize: label?.labelFontSize,
        fontWeight: label?.labelFontWeight,
      },
    },
    grid: {
      visible: grid?.visible,
      style: {
        lineWidth: grid?.gridWidth,
        stroke: grid?.gridColor,
      },
    },
    domainLine: {
      visible: line?.visible,
      style: {
        lineWidth: line?.lineWidth,
        stroke: line?.lineColor,
      },
    },
  }

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
