import type { ICartesianBandAxisSpec, ISpec } from '@visactor/vchart'
import type { SpecPipe, XBandAxis } from 'src/types'
import { defaultTitleText } from './title/defaultTitleText'

export const yBand: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { measures, dimensions, encoding } = advancedVSeed
  const config = advancedVSeed.config?.[chartType as 'bar']?.yAxis as XBandAxis

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
    labelAutoHide,
    labelAutoHideGap,
    labelAutoLimit,
    labelAutoLimitLength = 80,
    labelAutoRotate,
    labelAutoRotateAngleRange,
  } = config

  const sampling = !(labelAutoHide || labelAutoRotate || labelAutoLimit)

  const bandAxis = {
    visible,
    type: 'band',
    orient: 'left',
    maxWidth: labelAutoLimitLength + 60,
    sampling,
    hover: true,
    label: {
      visible: label?.visible,
      flush: true,
      containerAlign: 'right',
      space: 8,
      style: {
        maxLineWidth: labelAutoLimitLength,
        fill: label?.labelColor,
        angle: label?.labelAngle,
        fontSize: label?.labelFontSize,
        fontWeight: label?.labelFontWeight,
      },
      // 防重叠相关
      minGap: labelAutoHideGap,
      autoHide: labelAutoHide,
      autoHideMethod: 'greedy',
      autoHideSeparation: labelAutoHideGap,
      autoLimit: labelAutoLimit,
      autoRotate: labelAutoRotate,
      autoRotateAngle: labelAutoRotateAngleRange,
      lastVisible: true,
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
    paddingInner: [0.15, 0.1],
    paddingOuter: [0.075, 0.1],
  } as ICartesianBandAxisSpec

  result.axes = [...result.axes, bandAxis] as ISpec['axes']
  return result
}
