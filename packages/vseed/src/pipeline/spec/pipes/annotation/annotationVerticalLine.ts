import type { ILineChartSpec } from '@visactor/vchart'
import { selector } from '../../../../dataSelector'
import type { SpecPipe } from 'src/types'

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
      text = '',
      textPosition = 'insideStart',
      textColor = '#ffffff',
      textFontSize = 12,
      textFontWeight = 400,
      textAlign = 'center',
      textBaseline = 'middle',
      backgroundBorderColor,
      backgroundBorderRadius = 4,
      backgroundBorderWidth = 1,
      backgroundColor = '#212121',
      backgroundPadding = 2,
      backgroundVisible = true,
      offsetX = 0,
      offsetY = 0,
      lineColor = '#212121',
      lineStyle = 'dotted',
      lineVisible = true,
      lineWidth = 1,
    } = annotationVerticalLine

    const dataset = advancedVSeed.dataset.flat()
    const selectedData = dataset.filter((datum) => selector(datum, selectorPoint))

    return selectedData.map((datum) => {
      const x = encoding[0]?.x?.[0]
      if (!x) {
        return {}
      }
      return {
        x: datum[x] as string,
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
      }
    })
  }) as ILineChartSpec['markLine']

  return {
    ...spec,
    markLine,
  }
}
