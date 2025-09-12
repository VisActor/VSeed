import type { ILineChartSpec, IMarkLineSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { SpecPipe } from 'src/types'
import { isArray, isNumber, isString } from 'remeda'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'

export const annotationVerticalLine: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { annotation, datasetReshapeInfo } = advancedVSeed

  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  if (!annotation || !annotation.annotationVerticalLine) {
    return spec
  }

  const { annotationVerticalLine } = annotation
  const annotationVerticalLineList = Array.isArray(annotationVerticalLine)
    ? annotationVerticalLine
    : [annotationVerticalLine]

  const positionMap = {
    outsideStart: 'start',
    outsideEnd: 'end',
    outsideMiddle: 'middle',
    insideStart: 'insideStartTop',
    insideMiddle: 'insideMiddleTop',
    insideEnd: 'insideEndTop',
  }
  const markLine = annotationVerticalLineList.flatMap((annotationVerticalLine) => {
    const {
      selector: selectorPoint,
      xValue,
      text = '',
      textPosition = 'insideEnd',
      textColor = '#ffffff',
      textFontSize = 12,
      textFontWeight = 400,
      textAlign = 'right',
      textBaseline = 'top',

      textBackgroundVisible = true,
      textBackgroundBorderColor = '#212121',
      textBackgroundColor = '#212121',
      textBackgroundBorderRadius = 4,
      textBackgroundBorderWidth = 1,
      textBackgroundPadding = 2,

      lineVisible = true,
      lineColor = '#212121',
      lineWidth = 1,
      lineStyle = 'dashed',
    } = annotationVerticalLine

    const dataset = advancedVSeed.dataset.flat()

    const generateOneMarkLine = (x: number | string) => ({
      x: x as string,
      zIndex: ANNOTATION_Z_INDEX,
      line: {
        style: {
          visible: lineVisible,
          stroke: lineColor,
          lineStyle: lineStyle,
          lineWidth: lineWidth,
          lineDash: lineStyle === 'dashed' ? [5, 2] : lineStyle === 'dotted' ? [2, 5] : [0],
        },
      },
      label: {
        text: text,
        position: positionMap[textPosition || 'insideEnd'],
        style: {
          visible: true,
          stroke: textBackgroundColor,
          lineWidth: 1,
          textAlign: textAlign,
          textBaseline: textBaseline,
          fill: textColor,
          fontSize: textFontSize,
          fontWeight: textFontWeight,
          dy: textFontSize,
        },
        labelBackground: {
          visible: textBackgroundVisible,
          padding: textBackgroundPadding,
          style: {
            dy: textFontSize,
            cornerRadius: textBackgroundBorderRadius ?? 4,
            fill: textBackgroundColor,
            stroke: textBackgroundBorderColor,
            lineWidth: textBackgroundBorderWidth,
          },
        },
      },
      endSymbol: {
        visible: true,
        size: 10 + (lineWidth || 1),
        style: {
          dy: 4,
          fill: lineColor,
        },
      },
    })

    if ((!selectorPoint && isArray(xValue)) || isString(xValue) || isNumber(xValue)) {
      const xValueArr = Array.isArray(xValue) ? xValue : [xValue]
      return xValueArr.map(generateOneMarkLine)
    }

    const selectedData = selectorPoint ? dataset.filter((datum) => selector(datum, selectorPoint)) : []

    return selectedData.map((datum) => {
      if (datum[unfoldInfo.encodingX]) {
        return generateOneMarkLine(datum[unfoldInfo.encodingX] as string)
      }
      if (datum[foldInfo.measureValue]) {
        return generateOneMarkLine(datum[foldInfo.measureValue] as string)
      }
      return {}
    })
  }) as IMarkLineSpec[]

  const specMarkLine = ((spec as ILineChartSpec).markLine as IMarkLineSpec[]) || []
  const newMarkLine = [...specMarkLine, ...(markLine || [])]

  return {
    ...spec,
    markLine: newMarkLine,
  }
}
