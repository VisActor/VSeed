import type { ISpec } from '@visactor/vchart'
import { AXIS_LABEL_SPACE, LINEAR_AXIS_INNER_OFFSET_TOP } from '../../../../utils/constant'
import { createNumFormatter } from '../../../../utils'
import type { Spec, SpecPipe, YLinearAxis } from 'src/types'
import { isEmpty, isNullish } from 'remeda'
import { createLinearFormat } from './format/linearFormat'
import { defaultTitleText } from './title/defaultTitleText'

export const yLinearPrimary: SpecPipe<Spec> = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo, encoding, measures, dimensions } = advancedVSeed
  const { index, id: reshapeInfoId, foldInfoList } = datasetReshapeInfo[0]
  // TODO: default config missing
  const primaryYAxis = advancedVSeed.config?.[chartType as 'dualAxis']?.primaryYAxis as YLinearAxis | YLinearAxis[]
  const yAxisConfig = Array.isArray(primaryYAxis) ? primaryYAxis[index] || primaryYAxis[0] : primaryYAxis
  const alignTicks = advancedVSeed.config?.[chartType as 'dualAxis']?.alignTicks as boolean | boolean[]
  const alignTicksConfig = Array.isArray(alignTicks) ? alignTicks[index] || alignTicks[0] : alignTicks

  if (isNullish(foldInfoList?.[0])) {
    return result
  }

  const isEmptySecondary = isEmpty(foldInfoList?.[0].foldMap)

  const id = `${reshapeInfoId}-primary-axis`
  const seriesIds = [`${reshapeInfoId}-primary-series`, `${reshapeInfoId}-secondary-series`]
  const seriesId = alignTicksConfig ? seriesIds : seriesIds[0]

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
  } = yAxisConfig

  const formatter = createNumFormatter(numFormat)

  const linearAxis = {
    visible: isEmptySecondary ? false : visible,
    id,
    seriesId,

    type: log ? 'log' : 'linear',
    base: logBase,
    orient: 'left',
    nice,
    zero: log ? false : zero,
    inverse,
    max,
    min,
    label: {
      space: AXIS_LABEL_SPACE,
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
