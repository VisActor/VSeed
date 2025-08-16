import type { ILineChartSpec, IMarkLineSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { SpecPipe } from 'src/types'
import { isArray, isNumber, isString } from 'remeda'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'

export const annotationHorizontalLine: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { annotation, encoding } = advancedVSeed

  if (!annotation || !annotation.annotationHorizontalLine) {
    return spec
  }

  const { annotationHorizontalLine } = annotation
  const annotationVerticalLineList = Array.isArray(annotationHorizontalLine)
    ? annotationHorizontalLine
    : [annotationHorizontalLine]

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
      yValue,
      text = '',
      textPosition = 'insideEnd',
      textColor = '#ffffff',
      textFontSize = 12,
      textFontWeight = 400,
      textAlign = 'center',
      textBaseline = 'bottom',
      backgroundBorderColor,
      backgroundBorderRadius = 4,
      backgroundBorderWidth = 1,
      backgroundColor = '#212121',
      backgroundPadding = 2,
      backgroundVisible = true,
      lineColor = '#212121',
      lineStyle = 'dashed',
      lineVisible = true,
      lineWidth = 1,
    } = annotationVerticalLine

    const dataset = advancedVSeed.dataset.flat()

    const generateOneMarkLine = (y: string | number) => {
      return {
        y,
        zIndex: ANNOTATION_Z_INDEX,
        line: {
          visible: lineVisible,
          style: {
            stroke: lineColor,
            lineStyle: lineStyle,
            lineWidth: lineWidth,
            lineDash: lineStyle === 'dashed' ? [5, 2] : lineStyle === 'dotted' ? [2, 5] : [0],
          },
        },
        label: {
          text: text,
          position: positionMap[textPosition],
          style: {
            visible: true,
            textAlign: textAlign,
            textBaseline: textBaseline,
            fill: textColor,
            fontSize: textFontSize,
            fontWeight: textFontWeight,
          },
          labelBackground: {
            visible: backgroundVisible,
            padding: backgroundPadding,
            style: {
              cornerRadius: backgroundBorderRadius ?? 4,
              fill: backgroundColor,
              stroke: backgroundBorderColor,
              strokeWidth: backgroundBorderWidth,
            },
          },
        },
        endSymbol: {
          visible: true,
          style: {
            fill: lineColor,
          },
        },
      }
    }

    if ((!selectorPoint && isArray(yValue)) || isString(yValue) || isNumber(yValue)) {
      const yValueArr = Array.isArray(yValue) ? yValue : [yValue]
      return yValueArr.map(generateOneMarkLine)
    }

    const selectedData = dataset.filter((datum) => selector(datum, selectorPoint))

    return selectedData.map((datum) => {
      const y = encoding[0]?.y?.[0]
      if (!y) {
        return {}
      }
      return generateOneMarkLine(datum[y] as string)
    })
  }) as IMarkLineSpec[]
  const specMarkLine = ((spec as ILineChartSpec).markLine as IMarkLineSpec[]) || []
  const newMarkLine = [...specMarkLine, ...(markLine || [])]
  return {
    ...spec,
    markLine: newMarkLine,
  }
}
