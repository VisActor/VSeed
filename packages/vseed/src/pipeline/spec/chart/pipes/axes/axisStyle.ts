import type { ICartesianBandAxisSpec } from '@visactor/vchart'
import type { XBandAxis } from 'src/types'
import { AXIS_LABEL_SPACE } from 'src/pipeline/utils'

export const bandAxisStyle = (config: XBandAxis) => {
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

  return {
    type: 'band',
    sampling: !(labelAutoHide || labelAutoRotate || labelAutoLimit),
    visible,
    hover: true,
    label: {
      visible: label?.visible,
      flush: true,
      space: AXIS_LABEL_SPACE,
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
  } as Partial<ICartesianBandAxisSpec>
}
