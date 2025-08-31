import type { ISpec } from '@visactor/vchart'
import { LINEAR_AXIS_INNER_OFFSET_TOP } from '../../../../utils/constant'
import { autoFormatter } from '../../../../utils'
import type { SpecPipe, YLinearAxis } from 'src/types'
import { isEmpty } from 'remeda'

export const yLinearPrimary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { locale, datasetReshapeInfo } = advancedVSeed
  // TODO: default config missing
  const index = datasetReshapeInfo[0].index
  const primaryYAxis = advancedVSeed.config?.[chartType as 'dualAxis']?.primaryYAxis as YLinearAxis | YLinearAxis[]
  const yAxisConfig = Array.isArray(primaryYAxis) ? primaryYAxis[index] || primaryYAxis[0] : primaryYAxis
  const alignTicks = advancedVSeed.config?.[chartType as 'dualAxis']?.alignTicks as boolean | boolean[]
  const alignTicksConfig = Array.isArray(alignTicks) ? alignTicks[index] || alignTicks[0] : alignTicks

  if (datasetReshapeInfo[0].foldInfoList?.[0] && isEmpty(datasetReshapeInfo[0].foldInfoList[0].foldMap)) {
    return result
  }
  const id = `${datasetReshapeInfo[0].id}-primary-axis`
  const seriesIds = [`${datasetReshapeInfo[0].id}-primary-series`, `${datasetReshapeInfo[0].id}-secondary-series`]
  const seriesId = alignTicksConfig ? seriesIds : seriesIds[0]

  if (!result.axes) {
    result.axes = []
  }

  if (!yAxisConfig) {
    result.axes = [
      ...result.axes,
      {
        visible: true,
        id,
        seriesId,
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
    inverse,
    max,
    min,
    log,
    logBase = 10,
  } = yAxisConfig

  const linearAxis = {
    visible,
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
      visible: label?.visible,
      formatMethod: (value: string) => {
        return autoFormatter(value, locale)
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
      top: LINEAR_AXIS_INNER_OFFSET_TOP,
      // bottom: LINEAR_AXIS_INNER_OFFSET_TOP,
    },
  }

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
