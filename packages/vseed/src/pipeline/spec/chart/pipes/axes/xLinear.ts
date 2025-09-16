import type { ISpec } from '@visactor/vchart'
import { LINEAR_AXIS_INNER_OFFSET_TOP } from '../../../../utils/constant'
import type { SpecPipe, XLinearAxis } from 'src/types'
import { createNumFormatter } from '../../../../utils'
import { createLinearFormat } from './format/linearFormat'

export const xLinear: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const config = advancedVSeed.config?.[chartType as 'bar']?.xAxis as XLinearAxis

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
    log,
    logBase = 10,
    autoFormat,
    numFormat = {},
  } = config

  const formatter = createNumFormatter(numFormat)

  const linearAxis = {
    visible,
    type: log ? 'log' : 'linear',
    base: logBase,
    orient: 'bottom',
    nice,
    zero: log ? false : zero,
    inverse,
    max,
    min,
    label: {
      visible: label?.visible,
      formatMethod: (value: string) => {
        return createLinearFormat(value, autoFormat, numFormat, formatter)
      },
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
      right: LINEAR_AXIS_INNER_OFFSET_TOP,
      // left: LINEAR_AXIS_INNER_OFFSET_TOP,
    },
  }

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
