import type { ILineChartSpec, IMarkLineSpec } from '@visactor/vchart'
import { selector } from '../../../../dataSelector'
import type { SpecPipe } from 'src/types'
import { isArray, isNumber, isString } from 'remeda'

export const annotationVerticalLine: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { annotation, encoding } = advancedVSeed

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
      backgroundBorderColor,
      backgroundBorderRadius = 4,
      backgroundBorderWidth = 1,
      backgroundColor = '#212121',
      backgroundPadding = 2,
      backgroundVisible = true,
      offsetX = 0,
      offsetY = 0,
      lineColor = '#212121',
      lineStyle = 'dashed',
      lineVisible = true,
      lineWidth = 1,
    } = annotationVerticalLine

    const dataset = advancedVSeed.dataset.flat()

    const generateOneMarkLine = (x: number | string) => ({
      x: x as string,
      line: {
        visible: lineVisible,
        style: {
          offsetX,
          offsetY,
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
          offsetX,
          offsetY,
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
            offsetX,
            offsetY,
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
    })

    if ((!selectorPoint && isArray(xValue)) || isString(xValue) || isNumber(xValue)) {
      const xValueArr = Array.isArray(xValue) ? xValue : [xValue]
      return xValueArr.map(generateOneMarkLine)
    }

    const selectedData = dataset.filter((datum) => selector(datum, selectorPoint))

    return selectedData.map((datum) => {
      const x = encoding[0]?.x?.[0]
      if (!x) {
        return {}
      }
      return generateOneMarkLine(datum[x] as string)
    })
  }) as IMarkLineSpec[]

  const specMarkLine = ((spec as ILineChartSpec).markLine as IMarkLineSpec[]) || []
  const newMarkLine = [...specMarkLine, ...(markLine || [])]

  return {
    ...spec,
    markLine: newMarkLine,
  }
}
