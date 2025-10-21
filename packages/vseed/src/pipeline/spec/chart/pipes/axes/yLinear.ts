import type { ISpec } from '@visactor/vchart'
import {
  createNumFormatter,
  isAreaPercent,
  isBarPercent,
  isColumnPercent,
  LINEAR_AXIS_INNER_OFFSET_TOP,
} from 'src/pipeline/utils'
import type { SpecPipe, YLinearAxis } from 'src/types'
import { createLinearFormat, createLinearPercentFormat } from './format/linearFormat'
import { defaultTitleText } from './title/defaultTitleText'

export const yLinear: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { measures, dimensions, encoding } = advancedVSeed
  const config = advancedVSeed.config?.[chartType as 'column']?.yAxis as YLinearAxis

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
    orient: 'left',
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
      text: title?.titleText || defaultTitleText(measures, dimensions, encoding.y as string[]),
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
        lineDash: grid?.gridLineDash,
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
      // bottom: LINEAR_AXIS_INNER_OFFSET_TOP,
    },
  }

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
