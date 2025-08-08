import type { ICartesianBandAxisSpec, ISpec } from '@visactor/vchart'
import type { SpecPipe, XBandAxis } from 'src/types'

export const xBand: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const config = advancedVSeed.config?.[chartType]?.xAxis as XBandAxis

  if (!result.axes) {
    result.axes = []
  }

  if (!config) {
    result.axes = [
      ...result.axes,
      {
        visible: true,
        type: 'band',
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
    labelAutoHide,
    labelAutoHideGap,
    labelAutoLimit,
    labelAutoLimitLength,
    labelAutoRotate,
    labelAutoRotateAngleRange,
  } = config

  const bandAxis = {
    visible,
    type: 'band',
    orient: 'bottom',
    maxHeight: labelAutoLimitLength,
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
      // 防重叠相关
      autoHide: labelAutoHide,
      autoHideSeparation: labelAutoHideGap,
      autoLimit: labelAutoLimit,
      autoRotate: labelAutoRotate,
      autoRotateAngle: labelAutoRotateAngleRange,
      visible: label?.visible,
      style: {
        maxLineWidth: labelAutoLimitLength,
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
  } as ICartesianBandAxisSpec

  result.axes = [...result.axes, bandAxis] as ISpec['axes']
  return result
}
