import type { ISpec } from '@visactor/vchart'
import { LINEAR_AXIS_INNER_OFFSET_TOP } from '../../../constant'
import type { SpecPipe, XLinearAxis } from 'src/types'

export const xLinear: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const config = advancedVSeed.config?.[chartType]?.xAxis as XLinearAxis

  if (!result.axes) {
    result.axes = []
  }

  if (!config) {
    result.axes = [
      ...result.axes,
      {
        visible: true,
        type: 'linear',
        orient: 'bottom',
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
    inverse,
    max,
    min,
  } = config

  const linearAxis = {
    visible,
    type: 'linear',
    orient: 'bottom',
    nice,
    zero,
    inverse,
    max,
    min,
    label: {
      visible: label?.visible,
      style: {
        fill: label?.labelColor,
        angle: label?.labelAngle,
        fontSize: label?.labelFontSize,
        fontWeight: label?.labelFontWeight,
      },
    },
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
    innerOffset: {
      top: LINEAR_AXIS_INNER_OFFSET_TOP,
    },
  }

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
