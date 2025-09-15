import type { ISpec } from '@visactor/vchart'
import { LINEAR_AXIS_INNER_OFFSET_TOP } from '../../../../utils/constant'
import { autoFormatter, createNumFormatter } from '../../../../utils'
import type { SpecPipe, YLinearAxis } from 'src/types'
import { isEmpty, isNullish } from 'remeda'

export const yLinearSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { locale, datasetReshapeInfo } = advancedVSeed
  const { index, id: reshapeInfoId, foldInfoList } = datasetReshapeInfo[0]
  // TODO: default config missing
  const secondaryYAxis = advancedVSeed.config?.[chartType as 'dualAxis']?.secondaryYAxis as YLinearAxis | YLinearAxis[]
  const yAxisConfig = Array.isArray(secondaryYAxis) ? secondaryYAxis[index] || secondaryYAxis[0] : secondaryYAxis
  const alignTicks = advancedVSeed.config?.[chartType as 'dualAxis']?.alignTicks as boolean | boolean[]
  const alignTicksConfig = Array.isArray(alignTicks) ? alignTicks[index] || alignTicks[0] : alignTicks

  if (isNullish(foldInfoList?.[1])) {
    return result
  }

  const isEmptySecondary = isEmpty(foldInfoList?.[1].foldMap)
  const onlySecondary = isEmpty(foldInfoList?.[0].foldMap) && !isEmptySecondary

  const sync = {
    axisId: `${reshapeInfoId}-primary-axis`,
    zeroAlign: true,
  }

  const id = `${reshapeInfoId}-secondary-axis`
  const seriesIds = [`${reshapeInfoId}-primary-series`, `${reshapeInfoId}-secondary-series`]
  const seriesId = alignTicksConfig ? seriesIds : seriesIds[1]
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
        orient: 'right',
        sync,
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
    numFormat = {},
    autoFormat = true,
  } = yAxisConfig

  const formatter = createNumFormatter(numFormat, locale)

  const linearAxis = {
    visible: isEmptySecondary ? false : visible,
    id,
    seriesId,
    sync,
    type: log ? 'log' : 'linear',
    base: logBase,
    orient: 'right',
    nice,
    zero: log ? false : zero,
    inverse,
    max,
    min,
    label: {
      visible: label?.visible,
      formatMethod: (value: string) => {
        if (!isEmpty(numFormat)) {
          return formatter(value)
        }
        if (autoFormat) {
          return autoFormatter(value, locale)
        }
        return value
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
      visible: onlySecondary ? true : grid?.visible,
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
