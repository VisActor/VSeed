import type { ISpec } from '@visactor/vchart'
import type { SpecPipe, XLinearAxis } from 'src/types'
import {
  createNumFormatter,
  isAreaPercent,
  isBarPercent,
  isColumnPercent,
  LINEAR_AXIS_INNER_OFFSET_TOP,
} from 'src/pipeline/utils'
import { createLinearFormat, createLinearPercentFormat } from './format/linearFormat'
import { defaultTitleText } from './title/defaultTitleText'

export const xLinear: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { encoding, dimensions, measures } = advancedVSeed
  const { chartType } = vseed
  const config = advancedVSeed.config?.[chartType as 'bar']?.xAxis as XLinearAxis

  if (!result.axes) {
    result.axes = []
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
  const percentFormatter = createNumFormatter({
    type: 'percent',
  })

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
        if (isBarPercent(vseed) || isColumnPercent(vseed) || isAreaPercent(vseed)) {
          return createLinearPercentFormat(value, autoFormat, numFormat, formatter, percentFormatter)
        }
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
      text: title?.titleText || defaultTitleText(measures, dimensions, encoding.x as string[]),
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
