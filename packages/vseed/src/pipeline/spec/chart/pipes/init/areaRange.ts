import type { ILineSeriesSpec, IRangeAreaSeriesSpec } from '@visactor/vchart'
import type { Color, SpecPipe } from 'src/types'

export const initAreaRange: SpecPipe = (spec, context) => {
  const result = { ...spec } as IRangeAreaSeriesSpec
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed

  if (!encoding[0].y || !encoding[0].x || !encoding[0].group) {
    return result
  }
  const { color } = advancedVSeed.config.areaRange as {
    color: Color
  }

  result.type = 'rangeArea'
  result.direction = 'vertical'
  result.stack = false
  result.xField = encoding[0].x[0]
  result.yField = [encoding[0].y[0], encoding[0].y[1]]

  result.animation = true
  result.area = {
    style: {
      fill: color.colorScheme?.[0],
    },
  }

  return result
}

export const initAreaRangeLine1: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineSeriesSpec
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed

  if (!encoding[0].y || !encoding[0].x || !encoding[0].group) {
    return result
  }
  const { color } = advancedVSeed.config.areaRange as {
    color: Color
  }
  result.type = 'line'
  result.direction = 'vertical'
  result.stack = false
  result.xField = encoding[0].x[0]
  result.yField = [encoding[0].y[0]]

  result.animation = true
  result.line = {
    style: {
      stroke: color.colorScheme?.[0],
    },
  }
  result.point = {
    style: {
      visible: false,
      fill: color.colorScheme?.[0],
    },
  }
  return result
}

export const initAreaRangeLine2: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineSeriesSpec
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed

  if (!encoding[0].y || !encoding[0].x || !encoding[0].group) {
    return result
  }
  const { color } = advancedVSeed.config.areaRange as {
    color: Color
  }
  result.type = 'line'
  result.direction = 'vertical'
  result.stack = false
  result.xField = encoding[0].x[0]
  result.yField = [encoding[0].y[1]]

  result.animation = true
  result.line = {
    style: {
      stroke: color.colorScheme?.[0],
    },
  }
  result.point = {
    style: {
      visible: false,
      fill: color.colorScheme?.[0],
    },
  }
  return result
}
