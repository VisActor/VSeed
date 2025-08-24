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
  const config = advancedVSeed.config?.[chartType as 'dualAxis']?.primaryYAxis as YLinearAxis

  if (datasetReshapeInfo[0].foldInfoList?.[0] && isEmpty(datasetReshapeInfo[0].foldInfoList[0].foldMap)) {
    return result
  }
  const id = `${datasetReshapeInfo[0].id}-primary-axis`
  const seriesId = `${datasetReshapeInfo[0].id}-primary-series`

  if (!result.axes) {
    result.axes = []
  }

  if (!config) {
    result.axes = [
      ...result.axes,
      {
        visible: true,
        id,
        seriesId,
        type: 'linear',
        orient: 'left',
        sync: {
          axisId: `${datasetReshapeInfo[0].id}-secondary-axis`,
          tickAlign: false,
          zeroAlign: true,
        },
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
  } = config

  const linearAxis = {
    visible,
    id,
    seriesId,
    sync: {
      axisId: `${datasetReshapeInfo[0].id}-secondary-axis`,
      tickAlign: false,
      zeroAlign: true,
    },

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
